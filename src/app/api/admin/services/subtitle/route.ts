import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const patchVideoSchema = z.object({
  id: z.number(),
  subtitleUrl: z.string(),
});

export async function GET(req: NextRequest) {
  const authKey = req.headers.get('Authorization');

  if (authKey !== process.env.SUBTITLE_SECRET)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });

  try {
    const video = await db.videoMetadata.findFirst({
      where: {
        subtitles: null,
      },
      orderBy: [
        {
          subtitle_tried: 'asc',
        },
        {
          contentId: 'desc',
        },
      ],
      include: {
        content: {
          include: {
            courses: true,
          },
        },
      },
    });
    if (!video)
      return NextResponse.json(
        { message: 'No more video to process' },
        { status: 404 },
      );

    await db.videoMetadata.update({
      where: {
        id: video?.id,
      },
      data: {
        subtitle_tried: {
          increment: 1,
        },
      },
    });
    return NextResponse.json(video);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error fetching video' },
      { status: 500 },
    );
  }
}

export async function PATCH(req: NextRequest) {
  const authKey = req.headers.get('Authorization');

  if (authKey !== process.env.SUBTITLE_SECRET)
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });

  const requestBody = await req.json();
  const { success } = patchVideoSchema.safeParse(requestBody);

  if (!success)
    return NextResponse.json({ message: 'Invalid request' }, { status: 400 });

  try {
    const video = await db.videoMetadata.update({
      where: {
        id: requestBody.id,
      },
      data: {
        subtitles: requestBody.subtitleUrl,
      },
    });
    return NextResponse.json(video);
  } catch (error) {
    return NextResponse.json(
      { message: 'Error updating subtitle' },
      { status: 500 },
    );
  }
}
