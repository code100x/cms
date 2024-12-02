import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ContentRendererClient } from './ContentRendererClient';
import { Bookmark } from '@prisma/client';
import { getAppxCourseId } from '@/utiles/appx';

function bunnyUrl(url?: string) {
  if (!url) return '';
  return url
    .replace('https://appxcontent.kaxa.in', 'https://appxcontent.b-cdn.net')
    .replace(
      'https://appx-transcoded-videos.livelearn.in',
      'https://appx-transcoded-videos.b-cdn.net',
    )
    .replace(
      'https://appx-recordings.livelearn.in',
      'https://appx-recordings.b-cdn.net',
    );
}

async function isUrlAccessible(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    return false;
  }
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

  const userId: string = (1).toString();
  const user = await db.user.findFirst({
    where: {
      id: session?.user?.id?.toString() || '-1',
    },
  });

  // //@ts-ignore
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

  const bunnyUrls = {
    //@ts-ignore
    1080: bunnyUrl(metadata[`video_1080p_mp4_${userId}`]),
    //@ts-ignore
    720: bunnyUrl(metadata[`video_720p_mp4_${userId}`]),
    //@ts-ignore
    360: bunnyUrl(metadata[`video_360p_mp4_${userId}`]),
    subtitles: metadata['subtitles'],
    slides: metadata['slides'],
    segments: metadata['segments'],
    thumbnails: metadata['thumbnail_mosiac_url'],
    appxVideoJSON: metadata['appxVideoJSON'],
  };

  if (user?.bunnyProxyEnabled) {
    return bunnyUrls;
  }

  const mainUrls = {
    //@ts-ignore
    1080: metadata[`video_1080p_mp4_${userId}`],
    //@ts-ignore
    720: metadata[`video_720p_mp4_${userId}`],
    //@ts-ignore
    360: metadata[`video_360p_mp4_${userId}`],
    subtitles: metadata['subtitles'],
    slides: metadata['slides'],
    segments: metadata['segments'],
    thumbnails: metadata['thumbnail_mosiac_url'],
    appxVideoJSON: metadata['appxVideoJSON'],
  };

  const isHighestQualityUrlAccessible = await isUrlAccessible(mainUrls['1080']);

  if (isHighestQualityUrlAccessible) {
    return mainUrls;
  }

  const otherQualities = ['720', '360'];
  for (const quality of otherQualities) {
    //@ts-ignore
    const isAccessible = await isUrlAccessible(mainUrls[quality]);
    if (isAccessible) {
      return mainUrls;
    }
  }

  // If none of the main URLs are accessible, return Bunny URLs
  return bunnyUrls;
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
    type: 'video' | 'appx';
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    slides?: string;
    markAsCompleted: boolean;
    bookmark: Bookmark | null;
    courseId: string;
  };
}) => {
  const metadata = await getMetadata(content.id);
  const result = await getAppxCourseId(content.courseId);
  const appxCourseId = typeof result !== 'string' ? '' : result;

  // @ts-ignore
  const appxVideoId: string = metadata?.appxVideoJSON?.[appxCourseId] ?? '';

  return (
    <div>
      <ContentRendererClient
        nextContent={nextContent}
        metadata={metadata}
        content={{ ...content, appxVideoId, appxCourseId }}
      />
    </div>
  );
};
