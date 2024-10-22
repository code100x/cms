import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/courses/:path*'],
};

export default withAuth(
  async function middleware(req) {
    if (process.env.LOCAL_CMS_PROVIDER) {
      return NextResponse.next();
    }

    try {
      const token = req.nextauth?.token;

      if (!token?.jwtToken) {
        console.error('Authentication failed: No JWT token found');
        return NextResponse.redirect(new URL('/invalidsession', req.url));
      }

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_LOCAL;
      if (!baseUrl) {
        throw new Error(
          'NEXT_PUBLIC_BASE_URL_LOCAL environment variable is not set',
        );
      }

      const userResponse = await fetch(
        `${baseUrl}/api/user?token=${token.jwtToken}`,
        {
          headers: {
            Accept: 'application/json',
          },
          cache: 'no-store',
        },
      );

      if (!userResponse.ok) {
        throw new Error(
          `API request failed with status ${userResponse.status}`,
        );
      }

      const userData = await userResponse.json();

      if (!userData?.user) {
        console.error('Authentication failed: Invalid user data received');
        return NextResponse.redirect(new URL('/invalidsession', req.url));
      }

      return NextResponse.next();
    } catch (error) {
      console.error('Authentication middleware error:', error);
      return NextResponse.redirect(new URL('/invalidsession', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/login',
      error: '/error',
    },
  },
);
