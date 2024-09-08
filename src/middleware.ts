import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/courses/:path*'],
};

export default withAuth(async (req) => {
  if (process.env.LOCAL_CMS_PROVIDER) return;
  const token = req.nextauth.token;
  const userIp =
    req.headers.get('x-forwarded-for') ||
    req.ip ||
    req.headers.get('x-real-ip');

  if (!token) {
    return NextResponse.redirect(new URL('/invalidsession', req.url));
  }
  const user = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL_LOCAL}/api/user?token=${token.jwtToken}`,
  );

  const json = await user.json();
  if (!json.user || (json.user.ip && json.user.ip !== userIp)) {
    return NextResponse.redirect(new URL('/invalidsession', req.url));
  }
});
