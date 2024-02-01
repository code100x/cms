import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { adminSecret, email, disableDrm } = await req.json();

  if (adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({}, { status: 401 });
  }

  const user = await db.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    return NextResponse.json({ msg: 'User not found' }, { status: 440 });
  }

  const response = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      disableDrm,
    },
  });

  return NextResponse.json(
    { data: response },
    {
      status: 200,
    },
  );
}
