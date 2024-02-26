import { type NextRequest, NextResponse } from 'next/server';
import db from '@/db';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get('token');
  const user = await db.user.findFirst({
    where: {
      token,
    },
  });
  return NextResponse.json({
    user,
  });
}
