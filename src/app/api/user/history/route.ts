import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('id');

  if (!userId) {
    return NextResponse.json('Id not found');
  }

  const data = await db.videoProgress.findFirst({
    where: {
      userId,
    },
    include: {
      content: {
        include: {
          parent: {
            select: {
              id: true,
              courses: true,
            },
          },
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });
  return NextResponse.json(data);
}
