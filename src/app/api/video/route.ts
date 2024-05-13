import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function PUT(req: NextRequest) {
  const { contentId, duration } = await req.json();
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return NextResponse.json(
      { message: 'Authentication Failed' },
      { status: 401 },
    );
  }
  try {
    await db.videoMetadata.update({
      where: { contentId },
      data: { duration },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 400 });
  }
}
