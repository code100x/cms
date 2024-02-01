import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

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
  });
}

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    return NextResponse.json({}, { status: 401 });
  }

  return NextResponse.json({});
}
