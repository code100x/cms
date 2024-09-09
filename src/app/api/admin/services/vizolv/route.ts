import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const authKey = req.headers.get('Authorization');
  const videoId = req.nextUrl.searchParams.get('videoId');

  if (!videoId)
    return NextResponse.json(
      { message: 'No videoId provided' },
      { status: 400 },
    );

  if (authKey !== process.env.VIZOLV_SECRET)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });

  try {
    const videoMetadata = await db.videoMetadata.findFirst({
      where: {
        id: parseInt(videoId),
      },
      select: {
        content: {
          select: {
            title: true,
            description: true,
            parentId: true,
            courses: {
              select: {
                courseId: true,
              },
            },
          },
        },
        duration: true,
        contentId: true,
        subtitles: true,
      },
    });

    if (!videoMetadata)
      return NextResponse.json(
        { message: 'Unable to fetch video metadata' },
        { status: 404 },
      );

    return NextResponse.json(videoMetadata);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching video metadata' },
      { status: 500 },
    );
  }
}
