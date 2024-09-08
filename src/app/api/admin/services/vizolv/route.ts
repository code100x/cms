import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const authKey = req.headers.get('Authorization');
  const page = parseInt(req.nextUrl.searchParams.get('page') || '0');
  const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10');

  if (authKey !== process.env.VIZOLV_SECRET)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });

  try {
    const videoMetadata = await db.videoMetadata.findMany({
      where: {
        subtitles: {
          not: null,
        },
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
      orderBy: {
        contentId: 'desc',
      },
      take: limit,
      skip: page * limit,
    });

    if (!videoMetadata)
      return NextResponse.json(
        { message: 'Unable to fetch video metadata' },
        { status: 404 },
      );

    // Parse the video metadata to the format required by Vizolv
    const parsedVideoMetadata = videoMetadata.map((video) => ({
      title: video.content.title,
      description: video.content.description,
      duration: video.duration,
      courseId: video.content.courses[0]?.courseId,
      folderId: video.content.parentId,
      videoId: video.contentId,
      captions: video.subtitles,
    }));
    
    return NextResponse.json(parsedVideoMetadata);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching video metadata' },
      { status: 500 },
    );
  }
}
