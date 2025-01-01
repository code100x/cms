import db from '@/db';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

interface DiscordData {
  type: string;
  thumbnail: string;
  title: string;
  courseTitle: string;
  courseId: number;
  currFolderId: number;
  mediaId: number;
}

const sendUpdateToDiscord = async (data: DiscordData) => {
  const body = {
    content: 'Hello everyone',
    tts: false,
    color: 'white',
    embeds: [
      {
        title: `New ${data?.type === 'notion' ? 'NOTE' : data?.type?.toUpperCase()}`,
        description: `${data?.title} has been added in the ${data?.courseTitle} , [Click here to visit this ${data?.type === 'notion' ? 'note' : data?.type}](https://app.100xdevs.com/courses/${data?.courseId}/${data?.currFolderId}/${data?.mediaId})`,
      },
    ],
  };

  try {
    await axios.post(
      process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL as string,
      body,
    );
  } catch (error) {
    console.error('Failed to send update to Discord:', error);
  }
};

export const POST = async (req: NextRequest) => {
  const {
    type,
    thumbnail,
    title,
    courseId,
    parentContentId,
    metadata,
    adminPassword,
    courseTitle,
    rest,
    discordChecked,
  }: {
    type: 'video' | 'folder' | 'notion' | 'appx';
    thumbnail: string;
    title: string;
    courseId: number;
    parentContentId: number;
    metadata: any;
    adminPassword: string;
    courseTitle: string;
    rest: string[];
    discordChecked: boolean;
  } = await req.json();

  if (adminPassword !== process.env.ADMIN_SECRET) {
    return NextResponse.json({}, { status: 403 });
  }
  const maxPositionContent = await db.content.findFirst({
    where: {
      parentId: parentContentId,
      type,
    },
    orderBy: {
      position: 'desc',
    },
  });
  const maxPosition = maxPositionContent ? maxPositionContent.position : 0;
  const newPosition = maxPosition + 1;
  const content = await db.content.create({
    data: {
      type: type === 'appx' ? 'video' : type,
      title,
      parentId: parentContentId,
      thumbnail,
      position: newPosition
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
  } else if (type === 'appx') {
    await db.videoMetadata.create({
      data: {
        appxVideoJSON: JSON.parse(metadata.appxVideoJSON),
        contentId: content.id,
      },
    });
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

        subtitles: metadata.subtitles,
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
  if (discordChecked && (type === 'notion' || type === 'video' || type === 'appx')) {
    if (!process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL) {
      return NextResponse.json(
        { message: 'Environment variable for discord webhook is not set' },
        { status: 500 },
      );
    }
    const data: DiscordData = {
      type,
      thumbnail:
        'https://d2szwvl7yo497w.cloudfront.net/courseThumbnails/video.png',
      title,
      courseTitle,
      courseId,
      currFolderId: parseInt(rest[0], 10),
      mediaId: content.id,
    };
    await sendUpdateToDiscord(data);
  }

  return NextResponse.json(
    {
      message:
        discordChecked && (type === 'notion' || type === 'video' || type === 'appx')
          ? 'Content Added and Discord notification has been sent'
          : 'Content has been added',
    },
    { status: 200 },
  );
};

export async function PATCH(
  req: Request
) {
  console.log('calling patch request');
  const {
    type,
    thumbnail,
    title,
    contentId,
    description,
    metadata,
    adminSecret,
  }: {
    type: 'video' | 'folder' | 'notion';
    thumbnail: string;
    title: string;
    description: string;
    courseId: number;
    contentId: number;
    metadata: any;
    adminSecret: string;
  } = await req.json();
  console.log(type,
    thumbnail,
    title,
    contentId,
    description,
    metadata,
    adminSecret);
  if (adminSecret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({}, { status: 403 });
  }
  
  try {
    const content = await db.content.findUnique({
      where: { id: contentId }
    });

    if (!content) {
      return NextResponse.json({error: "No Content found"}, {status: 404});
    }

    const response = await db.content.update({
      where: { id: contentId },
      data: {
        title,
        description,
        thumbnail
      },
    });
    return NextResponse.json({status: 201, data: response});
  } catch (error) {
    console.log(error);
    return NextResponse.json({error});
  }
}
