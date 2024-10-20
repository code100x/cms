import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

const requestBodySchema = z.object({
  contentId: z.number(),
  duration: z.number(),
});

export async function POST(req: NextRequest) {
  const parseResult = requestBodySchema.safeParse(await req.json());

  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.message },
      { status: 400 },
    );
  }
  const { contentId, duration } = parseResult.data;
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return NextResponse.json({}, { status: 401 });
  }

  const updatedRecord = await db.videoMetadata.upsert({
    where: {
      contentId: Number(contentId),
    },
    create: {
      contentId: Number(contentId),
      duration: Number(duration),
    },
    update: {
      duration,
    },
  });

  return NextResponse.json(updatedRecord);
}
