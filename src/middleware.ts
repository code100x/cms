import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify, importJWK, JWTPayload } from 'jose';

export const config = {
  matcher: ['/courses/:path*', '/api/mobile/:path*'],
};

interface RequestWithUser extends NextRequest {
  user?: {
    id: string;
    email: string;
  };
}

export const verifyJWT = async (token: string): Promise<JWTPayload | null> => {
  const secret = process.env.JWT_SECRET || '';

  try {
    const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });
    const { payload } = await jwtVerify(token, jwk);

    return payload;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export const withMobileAuth = async (req: RequestWithUser) => {
  if (req.headers.get('Auth-Key')) {
    return NextResponse.next();
  }
  const token = req.headers.get('Authorization');

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }
  const payload = await verifyJWT(token);
  if (!payload) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }
  const newHeaders = new Headers(req.headers);

  /**
   * Add a global object 'g'
   * it holds the request claims and other keys
   * easily pass around this key as request context
   */
  newHeaders.set('g', JSON.stringify(payload));
  return NextResponse.next({
    request: {
      headers: newHeaders,
    },
  });
};

export default withAuth(async (req) => {
  if (process.env.LOCAL_CMS_PROVIDER) return;
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

export function middleware(req: NextRequestWithAuth) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/api/mobile')) {
    return withMobileAuth(req);
  }
  return withAuth(req);
}
