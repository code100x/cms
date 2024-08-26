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
    data: {
      video_360p_1: updates.video_360p,
      video_360p_2: updates.video_360p,
      video_360p_3: updates.video_360p,
      video_360p_4: updates.video_360p,
      video_720p_1: updates.video_720p,
      video_720p_2: updates.video_720p,
      video_720p_3: updates.video_720p,
      video_720p_4: updates.video_720p,
      video_1080p_1: updates.video_1080p,
      video_1080p_2: updates.video_1080p,
      video_1080p_3: updates.video_1080p,
      video_1080p_4: updates.video_1080p,
      /// mp4s

      video_1080p_mp4_1: updates.video_1080p_mp4,
      video_1080p_mp4_2: updates.video_1080p_mp4,
      video_1080p_mp4_3: updates.video_1080p_mp4,
      video_1080p_mp4_4: updates.video_1080p_mp4,
      video_720p_mp4_1: updates.video_720p_mp4,
      video_720p_mp4_2: updates.video_720p_mp4,
      video_720p_mp4_3: updates.video_720p_mp4,
      video_720p_mp4_4: updates.video_720p_mp4,
      video_360p_mp4_1: updates.video_360p_mp4,
      video_360p_mp4_2: updates.video_360p_mp4,
      video_360p_mp4_3: updates.video_360p_mp4,
      video_360p_mp4_4: updates.video_360p_mp4,
    },
  });

  return NextResponse.json({}, { status: 200 });
};
