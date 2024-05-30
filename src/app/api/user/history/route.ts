import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get('id');
  const courseId = Number(url.searchParams.get('courseId'));

  if (!userId || !courseId) {
    return NextResponse.json('Id not found');
  }

  const data = await db.videoProgress.findMany({
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
  const matchingItem = data.find(
    (item) => courseId === item.content.parent?.courses[0].courseId,
  );

  return matchingItem
    ? NextResponse.json({ id: matchingItem.content.parentId })
    : NextResponse.json({ error: 'No matching course found', id: 1 }); // sending a duplicate value to handle the undefined case
}
