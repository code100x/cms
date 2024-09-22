import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

interface RequestWithUser extends NextRequest {
  user?: any;
}

export const config = {
  matcher: ['/api/mobile/:path*'],
};

const validateJWT = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'secret');
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    console.error('JWT validation error:', error);
    return null;
  }
};

export const withMobileAuth = async (req: RequestWithUser) => {
  const token = req.headers.get('Authorization')?.split(' ')[1]; // Extract the token

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  const payload = await validateJWT(token);
  if (!payload) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  req.user = payload;

  return NextResponse.next();
};
