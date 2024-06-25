import { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
  twoFactorEnabled: boolean;
};

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser;
  }
}
