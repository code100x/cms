import db from '@/db';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SignJWT, importJWK } from 'jose';
import prisma from '@/db';
import bcrypt from 'bcrypt';

const generateJWT = async (payload: any) => {
  const secret = process.env.JWT_SECRET || 'secret';

  const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('365d')
    .sign(jwk);

  return jwt;
};

type Nullable<T> = T | null;
type ValidateUserReturn = {
  data: Nullable<{
    name: string;
    userid: string;
    token: string;
  }>;
};

async function validateUser(
  email: string,
  password: string,
): Promise<ValidateUserReturn> {
  try {
    const userFromDb = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!userFromDb) {
      return { data: null };
    }

    const passwordMatch = await bcrypt.compare(password, userFromDb.password!);
    if (!passwordMatch) {
      return { data: null };
    }

    return {
      data: {
        userid: userFromDb.id,
        name: userFromDb.name!,
        token: userFromDb.token!,
      },
    };
  } catch (error) {
    console.error('Error validating user:', error);
  }
  return {
    data: null,
  };
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'email', type: 'text', placeholder: '' },
        password: { label: 'password', type: 'password', placeholder: '' },
      },
      async authorize(credentials: any) {
        try {
          //@ts-ignore
          const user = await validateUser(
            credentials.username,
            credentials.password,
          );
          if (user.data) {
            const jwt = await generateJWT({
              id: user.data.userid,
            });
            try {
              await db.user.upsert({
                where: {
                  id: user.data.userid,
                },
                create: {
                  id: user.data.userid,
                  name: user.data.name,
                  email: credentials.username,
                  token: jwt,
                },
                update: {
                  id: user.data.userid,
                  name: user.data.name,
                  email: credentials.username,
                  token: jwt,
                },
              });
            } catch (e) {
              console.log(e);
            }

            return {
              id: user.data.userid,
              name: user.data.name,
              email: credentials.username,
              token: jwt,
            };
          }
          // Return null if user data could not be retrieved
          return null;
        } catch (e) {
          console.error(e);
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || 'secr3t',
  callbacks: {
    session: async ({ session, token }: any) => {
      if (session?.user) {
        session.user.id = token.uid;
        session.user.jwtToken = token.jwtToken;
        session.user.role = process.env.ADMINS?.split(',').includes(
          session.user.email,
        )
          ? 'admin'
          : 'user';
      }

      return session;
    },
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
        token.jwtToken = user.token;
      }
      return token;
    },
  },
  pages: {
    signIn: '/signin',
  },
};
