import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const { contentId, markAsCompleted } = await req.json();
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return NextResponse.json({}, { status: 401 });
  }

  const updatedRecord = await db.videoProgress.upsert({
    where: {
      contentId_userId: {
        contentId: Number(contentId),
        userId: session.user.id,
      },
    },
    create: {
      contentId: Number(contentId),
      userId: session.user.id,
      currentTimestamp: 0,
      markAsCompleted,
    },
    update: {
      markAsCompleted,
    },
  });

  return NextResponse.json(updatedRecord);
}
