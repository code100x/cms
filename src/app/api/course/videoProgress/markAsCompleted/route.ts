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
  const session = await getServerSession(authOptions);
  const data = await req.json();

  if (!session || !session?.user) {
    return NextResponse.json({}, { status: 401 });
  }

  const parseResult = requestBodySchema.safeParse(data);
  
  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.message },
      { status: 400 },
    );
  }
  const { contentId, markAsCompleted } = parseResult.data;

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
