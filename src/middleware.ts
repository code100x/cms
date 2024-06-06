import { NextRequestWithAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { handleMobileAuth, nextAuthMiddleware } from './lib/middleware-utils';

const PUBLIC_ROUTES = [
  '/',
  '/privacy-policy',
  '/refund',
  '/tnc',
  '/api/auth/mobile/login',
  '/signin',
];

export async function middleware(request: NextRequestWithAuth) {
  const pathname = request.nextUrl.pathname;

  // Check public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Mobile Auth
  await handleMobileAuth(request);

  /* 
  NextJS Auth - Other public routes 
  are also taken care by the next-auth middleware
  */
  return (nextAuthMiddleware as any)(request);
}
