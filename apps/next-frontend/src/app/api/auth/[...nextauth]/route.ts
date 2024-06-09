import NextAuth from 'next-auth';
import { authOptions } from '@repo/common/lib/auth';
//@ts-ignore
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
