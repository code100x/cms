import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ContentRendererClient } from './ContentRendererClient';
import { Bookmark } from '@prisma/client';

function bunnyUrl(url: string) {
  return url.replace("https://appxcontent.kaxa.in", "https://appxcontent.b-cdn.net").replace("https://appx-transcoded-videos.livelearn.in", "https://appx-transcoded-videos.b-cdn.net").replace("https://appx-recordings.livelearn.in", "https://appx-recordings.b-cdn.net");
}

export const getMetadata = async (contentId: number) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }
  const metadata = await db.videoMetadata.findFirst({
    where: {
      contentId,
    },
  });

  if (!metadata) {
    return null;
  }

  //@ts-ignore
  const userId: string = (1).toString();
  const user = await db.user.findFirst({
    where: {
      id: session?.user?.id?.toString() || '-1',
    },
  });
  //@ts-ignore
  // if (metadata.migration_status === 'MIGRATED') {
  //   return {
  //     //@ts-ignore
  //     1080: metadata[`migrated_video_1080p_mp4_1`].replace(
  //       '100x.b-cdn.net',
  //       'cdn.100xdevs.com',
  //     ),
  //     //@ts-ignore
  //     720: metadata[`migrated_video_720p_mp4_1`].replace(
  //       '100x.b-cdn.net',
  //       'cdn.100xdevs.com',
  //     ),
  //     //@ts-ignore
  //     360: metadata[`migrated_video_360p_mp4_1`].replace(
  //       '100x.b-cdn.net',
  //       'cdn.100xdevs.com',
  //     ),
  //     subtitles: metadata['subtitles'],
  //     //@ts-ignore
  //     slides: metadata['slides'],
  //     //@ts-ignore
  //     segments: metadata['segments'],
  //   };
  // }
  if (user.bunnyProxyEnabled) {
    return {
      //@ts-ignore
      1080: bunnyUrl(metadata[`video_1080p_mp4_${userId}`]),
      //@ts-ignore
      720: bunnyUrl(metadata[`video_720p_mp4_${userId}`]),
      //@ts-ignore
      360: bunnyUrl(metadata[`video_360p_mp4_${userId}`]),
      subtitles: metadata['subtitles'],
      //@ts-ignore
      slides: metadata['slides'],
      //@ts-ignore
      segments: metadata['segments'],
      // @ts-ignore
      thumnnails: metadata['thumbnail_mosiac_url'],
    };
  }
  return {
    //@ts-ignore
    1080: metadata[`video_1080p_mp4_${userId}`],
    //@ts-ignore
    720: metadata[`video_720p_mp4_${userId}`],
    //@ts-ignore
    360: metadata[`video_360p_mp4_${userId}`],
    subtitles: metadata['subtitles'],
    //@ts-ignore
    slides: metadata['slides'],
    //@ts-ignore
    segments: metadata['segments'],
  };
  return {
    //@ts-ignore
    1080: metadata[`video_1080p_${userId}`],
    //@ts-ignore
    720: metadata[`video_720p_${userId}`],
    //@ts-ignore
    360: metadata[`video_360p_${userId}`],
    //@ts-ignore
    subtitles: metadata['subtitles'],
    //@ts-ignore
    slides: metadata['slides'],
    //@ts-ignore
    segments: metadata['segments'],
    // @ts-ignore
    thumnnails: metadata['thumbnail_mosiac_url'],
  };
};

export const ContentRenderer = async ({
  content,
  nextContent,
}: {
  nextContent: {
    id: number;
    type: string;
    title: string;
  } | null;
  content: {
    type: 'video';
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    slides?: string;
    markAsCompleted: boolean;
    bookmark: Bookmark | null;
  };
}) => {
  const metadata = await getMetadata(content.id);

  return (
    <div>
      <ContentRendererClient
        nextContent={nextContent}
        metadata={metadata}
        content={content}
      />
    </div>
  );
};
