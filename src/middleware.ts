import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import { cache } from '@/db/Cache';
import db from '@/db';

export const config = {
  matcher: ['/courses/:path*'],
};

async function rateLimit(ip: string) {
  const limit = 5;
  const ttl = 30;
  const key = `ratelimit:${ip}`;

  const currentRequests = (await cache.get('ratelimit', [key])) || 0;
  await cache.set('ratelimit', [key], currentRequests + 1, ttl);

  return currentRequests + 1 <= limit;
}

export default withAuth(async (req) => {
  if (process.env.LOCAL_CMS_PROVIDER) return;

  const token = req.nextauth.token;
  const ipAddress =
    req.headers.get('x-forwarded-for')?.split(',')[0] || req.ip || 'unknown';

  if (!token) {
    return NextResponse.redirect(new URL('/invalidsession', req.url));
  }

  const isAllowed = await rateLimit(ipAddress);
  if (!isAllowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const session = await cache.get('session', [token.jti as string]);
  if (!session) {
    return NextResponse.redirect(new URL('/invalidsession', req.url));
  }

  const sessionData = JSON.parse(session as string);
  if (sessionData.ipAddress !== ipAddress) {
    const ipChangeCount = await db.ipChangeLog.count({
      where: {
        userId: token.id as string,
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });

    if (ipChangeCount > 2) {
      return NextResponse.redirect(new URL('/invalidsession', req.url));
    }

    await db.ipChangeLog.create({
      data: {
        userId: token.id as string,
        oldIp: sessionData.ipAddress,
        newIp: ipAddress,
      },
    });

    await cache.set(
      'session',
      [token.jti as string],
      JSON.stringify({ ...sessionData, ipAddress }),
    );
  }

  const response = NextResponse.next();

  const securityHeaders = {
    'X-XSS-Protection': '1; mode=block',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Content-Security-Policy':
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;",
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  };

  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
});
