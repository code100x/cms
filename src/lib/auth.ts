import db from '@/db';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWTPayload, SignJWT, importJWK } from 'jose';
import bcrypt from 'bcrypt';
import { NextAuthOptions } from 'next-auth';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import { v4 as uuidv4 } from 'uuid';
import { cache } from '@/db/Cache';

interface AppxSigninResponse {
  data: {
    userid: string;
    name: string;
    username?: string;
  } | null;
}

export interface session extends Session {
  user: {
    id: string;
    jwtToken: string;
    role: string;
    email: string;
    name: string;
  };
}

interface token extends JWT {
  uid: string;
  jwtToken: string;
}

interface user {
  id: string;
  name: string;
  email: string;
  token: string;
}

const generateJWT = async (payload: JWTPayload, ipAddress: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');

  const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });
  const jti = uuidv4();
  const jwt = await new SignJWT({ ...payload, ip: ipAddress, jti })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(jwk);

  await cache.set(
    'session',
    [jti],
    JSON.stringify({ ...payload, ipAddress }),
    24 * 60 * 60,
  );

  return jwt;
};

async function validateUser(
  email: string,
  password: string,
): Promise<
  | { data: null }
  | {
      data: {
        name: string;
        userid: string;
        token: string;
      };
    }
> {
  if (process.env.LOCAL_CMS_PROVIDER) {
    if (password === '123456') {
      return {
        data: {
          name: 'Random',
          userid: '1',
          token: '',
        },
      };
    }
    return { data: null };
  }
  const url = 'https://harkiratapi.classx.co.in/post/userLogin';
  const headers = {
    'Client-Service': process.env.APPX_CLIENT_SERVICE || '',
    'Auth-Key': process.env.APPX_AUTH_KEY || '',
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const body = new URLSearchParams();
  body.append('email', email);
  body.append('password', password);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data as any;
  } catch (error) {
    console.error('Error validating user:', error);
  }
  return {
    data: null,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'email', type: 'text', placeholder: '' },
        password: { label: 'password', type: 'password', placeholder: '' },
      },
      async authorize(credentials: any, req: any) {
        try {
          const ipAddress =
            req.headers['x-forwarded-for']?.split(',')[0] ||
            req.socket.remoteAddress;

          if (process.env.LOCAL_CMS_PROVIDER) {
            return {
              id: '1',
              name: 'test',
              email: 'test@gmail.com',
              token: await generateJWT(
                {
                  id: '1',
                },
                ipAddress,
              ),
            };
          }

          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          const userDb = await db.user.findFirst({
            where: {
              email: credentials.username,
            },
            select: {
              password: true,
              id: true,
              name: true,
            },
          });

          if (
            userDb &&
            userDb.password &&
            (await bcrypt.compare(credentials.password, userDb.password))
          ) {
            const jwt = await generateJWT(
              {
                id: userDb.id,
              },
              ipAddress,
            );

            await db.user.update({
              where: {
                id: userDb.id,
              },
              data: {
                token: jwt,
              },
            });

            return {
              id: userDb.id,
              name: userDb.name,
              email: credentials.username,
              token: jwt,
            };
          }

          console.log('User not in db, validating with external service');
          const user: AppxSigninResponse = await validateUser(
            credentials.username,
            credentials.password,
          );

          if (user.data) {
            const jwt = await generateJWT(
              {
                id: user.data.userid,
              },
              ipAddress,
            );

            try {
              const createdUser = await db.user.upsert({
                where: {
                  id: user.data.userid,
                },
                create: {
                  id: user.data.userid,
                  name: user.data.name,
                  email: credentials.username,
                  token: jwt,
                  password: hashedPassword,
                },
                update: {
                  name: user.data.name,
                  email: credentials.username,
                  token: jwt,
                  password: hashedPassword,
                },
              });

              return {
                id: createdUser.id,
                name: createdUser.name,
                email: credentials.username,
                token: jwt,
              };
            } catch (e) {
              console.error('Error creating or updating user:', e);
              return null;
            }
          }
          return null;
        } catch (e) {
          console.error('Error in authorize function:', e);
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || 'secr3t',
  callbacks: {
    async jwt({ token, user }): Promise<token> {
      if (user) {
        (token as token).uid = user.id;
        (token as token).jwtToken = (user as user).token;
      }
      return token as token;
    },
    async session({ session, token }) {
      const newSession = session as session;
      if (newSession.user && (token as token).uid) {
        newSession.user.id = (token as token).uid;
        newSession.user.jwtToken = (token as token).jwtToken;
        newSession.user.role = process.env.ADMINS?.split(',').includes(
          session.user?.email ?? '',
        )
          ? 'admin'
          : 'user';
      }
      return newSession;
    },
  },
  pages: {
    signIn: '/signin',
  },
};

export { generateJWT };
