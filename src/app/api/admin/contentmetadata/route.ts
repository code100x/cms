import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const {
    updates,
    contentId,
  }: {
    updates: any;
    contentId: number;
  } = await req.json();

  await db.videoMetadata.update({
    where: {
      contentId,
    },
    data: updates,
  });

  return NextResponse.json({}, { status: 200 });
};
