import 'next-auth';
import { DefaultSession } from 'next-auth';

enum Roles {
  'admin',
  'user',
}

declare module 'next-auth' {
  interface User {
    jwtToken?: string;
    id?: string;
    email: string;
    role: 'admin' | 'user';
    token?: string;
    role?: string;
  }
  interface Session {
    user: {
      role?: string;
      email: string;
      role: 'admin' | 'user';
      id?: string;
      role?: Roles;
      jwtToken?: string;
      email?: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    uid?: string;
    username?: string;
    role?: string;
    jwtToken?: string;
  }
}
