import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export const config = {
  matcher: ['/courses/:path*', '/questions/:path*', '/bookmarks'],
};

export default withAuth(async (req) => {
  if (process.env.LOCAL_CMS_PROVIDER) return;

  try {
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
  } catch(e) {
    return NextResponse.redirect(new URL('/invalidsession', req.url));
  }

});
