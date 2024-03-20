import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { revalidatePath } from 'next/cache';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const contentId = searchParams.get('contentId');
  const session = await getServerSession(authOptions);

  if (!session || !session?.user || !contentId) {
    return NextResponse.json({}, { status: 401 });
  }

  const currentProgress = await db.videoProgress.findFirst({
    where: {
      userId: session.user.id,
      contentId: Number(contentId),
    },
  });
  return NextResponse.json({
    progress: currentProgress?.currentTimestamp ?? 0,
    markAsCompleted: currentProgress?.markAsCompleted ?? false,
  });
}

export async function POST(req: NextRequest) {
  const { contentId, currentTimestamp, videoDuration } = await req.json();
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
      currentTimestamp,
      videoDuration,
    },
    update: {
      currentTimestamp,
      ...(videoDuration && { videoDuration }),
    },
  });
  revalidatePath('/history');
  return NextResponse.json(updatedRecord);
}
