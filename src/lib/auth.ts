import CredentialsProvider from 'next-auth/providers/credentials';
import { SignJWT, importJWK } from 'jose';
import bcrypt from 'bcrypt';
import prisma from '@/db';
import { NextAuthOptions, Session } from 'next-auth';
import { randomUUID } from 'crypto';

interface AppxSigninResponse {
  data: {
    userid: string;
    name: string;
    token: string;
  } | null;
}

interface CustomSession extends Session {
  user: {
    id: string;
    jwtToken: string;
    role: string;
    email: string;
    name: string;
  };
}

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

const generateJWT = async (payload: Record<string, unknown>): Promise<string> => {
  const secret = process.env.JWT_SECRET || 'default_secret';
  const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });
  const jwt = await new SignJWT({
    ...payload,
    iat: Math.floor(Date.now() / 1000),
    jti: randomUUID(),
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('1y')
    .sign(jwk);

  return jwt;
};

const validateUser = async (
  email: string,
  password: string,
): Promise<AppxSigninResponse> => {
  if (process.env.LOCAL_CMS_PROVIDER) {
    if (password === '123456') {
      return {
        data: {
          userid: '1',
          name: 'Local User',
          token: 'dummy-token',
        },
      };
    }
    return { data: null };
  }

  const response = await fetch(`${process.env.APPX_BASE_API}/post/userLogin`, {
    method: 'POST',
    headers: {
      'Client-Service': process.env.APPX_CLIENT_SERVICE || '',
      'Auth-Key': process.env.APPX_AUTH_KEY || '',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({ email, password }),
  });

  if (response.ok) {
    return response.json() as Promise<AppxSigninResponse>;
  }

  console.error(`Failed to validate user: ${response.status}`);
  return { data: null };
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const userDb = await prisma.user.findFirst({
          where: { email: credentials.username },
          select: {
            password: true,
            id: true,
            name: true,
            appxAuthToken: true,
          },
        });

        if (
          userDb &&
          userDb.password &&
          (await bcrypt.compare(credentials.password, userDb.password)) &&
          userDb.appxAuthToken
        ) {
          const token = await generateJWT({ id: userDb.id });
          await prisma.user.update({
            where: { id: userDb.id },
            data: { token },
          });
          return { id: userDb.id, name: userDb.name, email: credentials.username, token };
        }

        const appxUser = await validateUser(credentials.username, credentials.password);
        if (appxUser.data) {
          const { userid, name, token } = appxUser.data;
          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          await prisma.user.upsert({
            where: { id: userid },
            create: { id: userid, name, email: credentials.username, token, password: hashedPassword },
            update: { token, password: hashedPassword },
          });

          return { id: userid, name, email: credentials.username, token };
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || 'default_secret',
  callbacks: {
    session: async ({ session, token }) => {
      const customSession: CustomSession = {
        ...session,
        user: {
          id: token.uid as string,
          jwtToken: token.jwtToken as string,
          role: process.env.ADMINS?.split(',').includes(session.user?.email ?? '') ? 'admin' : 'user',
          email: session.user?.email ?? '',
          name: session.user?.name ?? 'Unknown',
        },
      };
      return customSession;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.uid = user.id;
        token.jwtToken = (user as User as { token: string }).token;
      }
      return token;
    },
  },
  
  pages: {
    signIn: '/signin',
  },
};
