import NextAuth, { AuthOptions } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';
import { cache } from '@/db/Cache';
import { SignJWT, importJWK } from 'jose';
import { v4 as uuidv4 } from 'uuid';

interface ExtendedAuthOptions extends AuthOptions {
  generateJWT?: (
    payload: any,
    ipAddress: string,
  ) => Promise<{ jwt: string; refreshToken: string }>;
}

const extendedAuthOptions: ExtendedAuthOptions = {
  ...authOptions,
  generateJWT: async (payload: any, ipAddress: string) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not defined');

    const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });
    const jti = uuidv4();
    const jwt = await new SignJWT({ ...payload, ip: ipAddress, jti })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('15m')
      .sign(jwk);

    const refreshToken = uuidv4();
    await cache.set(
      'session',
      [jti],
      JSON.stringify({ ...payload, ipAddress, refreshToken }),
      24 * 60 * 60,
    );
    await cache.set('refresh_token', [refreshToken], jti, 7 * 24 * 60 * 60);

    return { jwt, refreshToken };
  },
};

const handler = NextAuth(extendedAuthOptions);

async function refreshTokenHandler(req: NextRequest) {
  const { refreshToken } = await req.json();

  const jti = await cache.get('refresh_token', [refreshToken]);

  if (!jti) {
    return NextResponse.json(
      { error: 'Invalid refresh token' },
      { status: 401 },
    );
  }

  const session = await cache.get('session', [jti as string]);

  if (!session) {
    return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
  }

  const sessionData = JSON.parse(session as string);
  const ipAddress =
    req.headers.get('x-forwarded-for')?.split(',')[0] || req.ip || 'unknown';

  if (typeof extendedAuthOptions.generateJWT !== 'function') {
    return NextResponse.json(
      { error: 'Server configuration error' },
      { status: 500 },
    );
  }

  const { jwt: newJwt, refreshToken: newRefreshToken } =
    await extendedAuthOptions.generateJWT(
      {
        id: sessionData.userId,
      },
      ipAddress,
    );

  await cache.delete('refresh_token', [refreshToken]);

  await cache.set('refresh_token', [newRefreshToken], newJwt, 7 * 24 * 60 * 60);

  return NextResponse.json(
    { accessToken: newJwt, refreshToken: newRefreshToken },
    { status: 200 },
  );
}

export async function GET(req: NextRequest) {
  return handler(req as any);
}

export async function POST(req: NextRequest) {
  if (req.nextUrl.pathname === '/api/auth/refresh') {
    return refreshTokenHandler(req);
  }

  return handler(req as any);
}
