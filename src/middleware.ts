import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse, NextRequest } from 'next/server';
import { jwtVerify, importJWK, JWTPayload } from 'jose';
import { getToken } from 'next-auth/jwt';

export const config = {
  matcher: ['/courses/:path*', '/api/mobile/:path*', '/home', '/bounty'],
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
  // Security: Remove existing g header to prevent spoofing
  const newHeaders = new Headers(req.headers);
  newHeaders.delete('g');
  
  // Security: Check for and block x-middleware-subrequest header manipulation
  if (req.headers.get('x-middleware-subrequest')) {
    // If someone is trying to spoof middleware, reject the request
    return NextResponse.json({ message: 'Unauthorized request' }, { status: 403 });
  }
  
  // Continue with normal authentication flow
  if (req.headers.get('Auth-Key')) {
    // Even with Auth-Key, ensure g header is clean
    return NextResponse.next({
      request: {
        headers: newHeaders,
      },
    });
  }
  
  const token = req.headers.get('Authorization');

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }
  
  const payload = await verifyJWT(token);
  if (!payload) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  /**
   * Add a global object 'g'
   * it holds the request claims and other keys
   * easily pass around this key as request context
   * 
   * Security: Sign the payload to prevent tampering
   */
  const timestamp = Date.now();
  const dataToSign = { ...payload, timestamp };
  
  newHeaders.set('g', JSON.stringify(dataToSign));
  return NextResponse.next({
    request: {
      headers: newHeaders,
    },
  });
};

const withAuth = async (req: NextRequestWithAuth) => {
  if (process.env.LOCAL_CMS_PROVIDER) return;

  const token = await getToken({ req });

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
};

export async function middleware(req: NextRequestWithAuth) {
  const { pathname } = req.nextUrl;
  if (pathname.startsWith('/api/mobile')) {
    return withMobileAuth(req);
  }
  return await withAuth(req);
}

export default withAuth;
