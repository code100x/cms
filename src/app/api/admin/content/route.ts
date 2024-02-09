import db from '@/db';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const {
    type,
    thumbnail,
    title,
    courseId,
    parentContentId,
    metadata,
    adminPassword,
  }: {
    type: 'video' | 'folder' | 'notion';
    thumbnail: string;
    title: string;
    courseId: number;
    parentContentId: number;
    metadata: any;
    adminPassword: string;
  } = await req.json();

  if (adminPassword !== process.env.ADMIN_SECRET) {
    return NextResponse.json({}, { status: 403 });
  }

  const content = await db.content.create({
    data: {
      type,
      title,
      parentId: parentContentId,
      thumbnail,
    },
  });

  if (type === 'folder') {
    if (courseId && !parentContentId) {
      await db.courseContent.create({
        data: {
          courseId,
          contentId: content.id,
        },
      });
    }
  } else if (type === 'notion') {
    await db.notionMetadata.create({
      data: {
        notionId: metadata.notionId,
        contentId: content.id,
      },
    });
    if (courseId && !parentContentId) {
      await db.courseContent.create({
        data: {
          courseId,
          contentId: content.id,
        },
      });
    }
  } else if (type === 'video') {
    await db.videoMetadata.create({
      data: {
        video_360p_1: metadata.video_360p_1,
        video_360p_2: metadata.video_360p_2,
        video_360p_3: metadata.video_360p_3,
        video_360p_4: metadata.video_360p_4,
        video_720p_1: metadata.video_720p_1,
        video_720p_2: metadata.video_720p_2,
        video_720p_3: metadata.video_720p_3,
        video_720p_4: metadata.video_720p_4,
        video_1080p_1: metadata.video_1080p_1,
        video_1080p_2: metadata.video_1080p_2,
        video_1080p_3: metadata.video_1080p_3,
        video_1080p_4: metadata.video_1080p_4,
        /// mp4s

        video_1080p_mp4_1: metadata.video_1080p_mp4_1,
        video_1080p_mp4_2: metadata.video_1080p_mp4_2,
        video_1080p_mp4_3: metadata.video_1080p_mp4_3,
        video_1080p_mp4_4: metadata.video_1080p_mp4_4,
        video_720p_mp4_1: metadata.video_720p_mp4_1,
        video_720p_mp4_2: metadata.video_720p_mp4_2,
        video_720p_mp4_3: metadata.video_720p_mp4_3,
        video_720p_mp4_4: metadata.video_720p_mp4_4,
        video_360p_mp4_1: metadata.video_360p_mp4_1,
        video_360p_mp4_2: metadata.video_360p_mp4_2,
        video_360p_mp4_3: metadata.video_360p_mp4_3,
        video_360p_mp4_4: metadata.video_360p_mp4_4,

        subtitles: metadata.subtitles || '',
        segments: metadata.segments || [],
        duration: metadata.duration,
        thumbnail_mosiac_url: metadata.thumbnail_mosiac_url,
        contentId: content.id,
      },
    });
    if (courseId && !parentContentId) {
      await db.courseContent.create({
        data: {
          courseId,
          contentId: content.id,
        },
      });
    }
  }
  return NextResponse.json({}, { status: 200 });
};
