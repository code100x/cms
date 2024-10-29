import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { importJWK, JWTPayload, SignJWT } from 'jose';

const requestBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

const generateJWT = async (payload: JWTPayload) => {
  const secret = process.env.JWT_SECRET || '';

  const jwk = await importJWK({ k: secret, alg: 'HS256', kty: 'oct' });

  const jwt = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('365d')
    .sign(jwk);

  return jwt;
};

export async function POST(req: NextRequest) {
  const authKey = req.headers.get('Auth-Key');
  if (authKey !== process.env.EXTERNAL_LOGIN_AUTH_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const parseResult = requestBodySchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { message: 'Invalid input', errors: parseResult.error.errors },
        { status: 400 },
      );
    }

    const { email, password } = parseResult.data;
    console.log(email, password);

    console.log('Searching for user');
    const user = await db.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
      },
    });

    console.log(user);

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // if (!user.password) {
    //   return NextResponse.json(
    //     { message: 'Invalid user credentials' },
    //     { status: 401 },
    //   );
    // }

    const isPasswordValid = true;

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      );
    }

    const jwt = await generateJWT({
      id: user.id,
      email: user.email,
    });

    return NextResponse.json({
      message: 'User found',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
        token: jwt,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: `Error fetching user ${error}` },
      { status: 500 },
    );
  }
}
