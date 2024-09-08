import { type NextRequest, NextResponse } from 'next/server';
import db from '@/db';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  const ip = url.searchParams.get('ip');

  if (!token || !ip) {
    return NextResponse.redirect(new URL('/invalidsession', req.url));
  }
  const user = await db.user.findFirst({
    where: {
      token,
    },
  });

  if (!user || user.ip !== ip) {
    return NextResponse.redirect(new URL('/invalidsession', req.url));
  }

  return NextResponse.json({
    user,
  });
}
