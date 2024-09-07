import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { verify, JwtPayload } from 'jsonwebtoken';
export const config = {
  matcher: ['/courses/:path*'],
};

export default withAuth(async (req) => {
  if (process.env.LOCAL_CMS_PROVIDER) return;
  const token = req.nextauth.token;
  if (!token || typeof token.jwtToken !== 'string') {
    return NextResponse.redirect(new URL('/invalidsession', req.url));
  }

  const secret = process.env.JWT_SECRET || 'secret';

  const decoded = verify(token.jwtToken, secret) as JwtPayload & {
    ip?: string;
  };
  const tokenIp = decoded.ip;

  const forwardedFor = req.headers.get('x-forwarded-for');
  const currentIp =
    typeof forwardedFor === 'string' ? forwardedFor.split(',')[0].trim() : '';

  if (tokenIp !== currentIp) {
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
