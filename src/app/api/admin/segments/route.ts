import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const requestBodySchema = z.object({
  adminSecret: z.string(),
  contentId: z.number(),
  segmentsJson: z.unknown(),
});

export async function POST(req: NextRequest) {
  const parseResult = requestBodySchema.safeParse(await req.json());
  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.message },
      { status: 400 },
    );
  }
  const { adminSecret, contentId, segmentsJson } = parseResult.data;

  if (adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({}, { status: 401 });
  }

  const response = await db.videoMetadata.update({
    where: {
      contentId: Number(contentId),
    },
    data: {
      segments: JSON.parse(JSON.stringify(segmentsJson)),
    },
  });

  return NextResponse.json(
    { data: response },
    {
      status: 200,
    },
  );
}
