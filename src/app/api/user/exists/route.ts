import { type NextRequest, NextResponse } from 'next/server';
import db from '@/db';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);

  const apiKey = url.searchParams.get('apiKey');
  const email = url.searchParams.get('email');
  if (!apiKey) {
    return NextResponse.json({ message: 'No token provided' }, { status: 400 });
  }
  if (apiKey !== process.env.JOB_BOARD_AUTH_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 400 });
  }
  const user = await db.user.findFirst({
    where: {
      email,
    },
    select: {
      purchases: true,
      email: true,
      id: true,
      name: true,
      certificate: true,
    },
  });
  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({
    user,
  });
}
