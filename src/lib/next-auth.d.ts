import { DefaultProfile } from 'next-auth';

declare module 'next-auth' {
  interface Profile extends DefaultProfile {
    login?: string; // GitHub username
    id?: number; // GitHub user ID
  }
}
