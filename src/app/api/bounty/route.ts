import db from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session?.user.role !== 'admin') {
    return NextResponse.json(
      { message: 'Authentication failed' },
      { status: 401 },
    );
  }
  const { id } = await req.json();

  try {
    await db.bountyInfo.update({
      where: { id, isPaid: false },
      data: { isPaid: true },
    });

    return NextResponse.json({ message: 'ok' }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: 'Error while updating' },
      { status: 402 },
    );
  }
}
