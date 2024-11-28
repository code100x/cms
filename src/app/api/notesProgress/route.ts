import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

const requestBodySchema = z.object({
  isCompleted: z.boolean(), 
  contentId: z.number(),
});

export async function POST(req: NextRequest) {
  const parseResult = requestBodySchema.safeParse(await req.json());
  if (!parseResult.success) {
    return NextResponse.json(
      { error: parseResult.error.message },
      { status: 400 },
    );
  }

  const { contentId, isCompleted } = parseResult.data;
  const session = await getServerSession(authOptions);
  if (!session || !session?.user) {
    return NextResponse.json({}, { status: 401 });
  }
  const existingRecord = await db.notesProgress.findFirst({
    where: {
      userId: session.user.id,
      contentId: Number(contentId),
    },
  });
  
  let updatedRecord;
  
  if (existingRecord) {
    // If the record exists, update it
    updatedRecord = await db.notesProgress.update({
      where: { id: existingRecord.id }, // Use the primary key `id`
      data: { isCompleted },
    });
  } else {
    // If the record doesn't exist, create it
    updatedRecord = await db.notesProgress.create({
      data: {
        userId: session.user.id,
        contentId: Number(contentId),
        isCompleted,
      },
    });
  }
  
  return NextResponse.json(updatedRecord);
}
