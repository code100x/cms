import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

const requestBodySchema = z.object({
  contentId: z.number(),
  markAsCompleted: z.boolean(),
});

export async function POST(req: NextRequest) {
  const userInfo = await req.json();
  const parseResult = requestBodySchema.safeParse(userInfo);
  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.message },
      { status: 400 },
    );
  }
  const { contentId, markAsCompleted } = userInfo;
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
