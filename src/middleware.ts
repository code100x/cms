import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/courses/:path*'],
};

export default withAuth(async (req) => {
  const token = req.nextauth.token;
  if (!token) {
    return NextResponse.redirect(new URL('/invalidsession', req.url));
  }
  const user = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_LOCAL}/api/user?token=${token.jwtToken}`,
  );

  const json = await user.json();
  if (!json.user) {
    return NextResponse.redirect(new URL('/invalidsession', req.url));
  }
});
