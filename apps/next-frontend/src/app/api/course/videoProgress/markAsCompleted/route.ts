import { NextRequest, NextResponse } from 'next/server';
import db from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@repo/common/lib/auth';
import { markAsCompletedRequestBodySchema } from '@repo/common/schema/course';

export async function POST(req: NextRequest) {
  const parseResult = markAsCompletedRequestBodySchema.safeParse(
    await req.json(),
  );
  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.message },
      { status: 400 },
    );
  }
  const { contentId, markAsCompleted } = parseResult.data;
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
