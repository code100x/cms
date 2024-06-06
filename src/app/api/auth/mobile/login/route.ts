import { NextRequest, NextResponse } from 'next/server';
import { authorize } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, password } = reqBody;

    const user = await authorize({ username, password });

    if (!user) {
      return NextResponse.json(
        { error: 'User does not exist' },
        { status: 400 },
      );
    }
    const { token, ...otherProperties } = user;
    const response = NextResponse.json({
      message: 'Login successful',
      token,
      user: { ...otherProperties },
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
