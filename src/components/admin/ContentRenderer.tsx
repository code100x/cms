import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ContentRendererClient } from './ContentRendererClient';
import { Bookmark } from '@prisma/client';

function bunnyUrl(url: string) {
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
      1080: bunnyUrl(metadata[`video_1080p_mp4_${userId}`]),
      720: bunnyUrl(metadata[`video_720p_mp4_${userId}`]),
      360: bunnyUrl(metadata[`video_360p_mp4_${userId}`]),
      subtitles: metadata['subtitles'],
      slides: metadata['slides'],
      segments: metadata['segments'],
      thumnnails: metadata['thumbnail_mosiac_url'],
    };
  }

  // Check the highest quality video URL (1080p) first
  const highestQualityUrl = metadata[`video_1080p_mp4_${userId}`];
  const isHighestQualityUrlAccessible = await isUrlAccessible(highestQualityUrl);

  if (isHighestQualityUrlAccessible) {
    // If the highest quality URL is accessible, return all main URLs
    return {
      1080: highestQualityUrl,
      720: metadata[`video_720p_mp4_${userId}`],
      360: metadata[`video_360p_mp4_${userId}`],
      subtitles: metadata['subtitles'],
      slides: metadata['slides'],
      segments: metadata['segments'],
    };
  }

  // If the highest quality URL is not accessible, check the 720p URL
  const mediumQualityUrl = metadata[`video_720p_mp4_${userId}`];
  const isMediumQualityUrlAccessible = await isUrlAccessible(mediumQualityUrl);

  if (isMediumQualityUrlAccessible) {
    // If the 720p URL is accessible, return main URLs for 720p and 360p
    return {
      720: mediumQualityUrl,
      360: metadata[`video_360p_mp4_${userId}`],
      subtitles: metadata['subtitles'],
      slides: metadata['slides'],
      segments: metadata['segments'],
    };
  }

  // If the 720p URL is not accessible, check the 360p URL
  const lowestQualityUrl = metadata[`video_360p_mp4_${userId}`];
  const isLowestQualityUrlAccessible = await isUrlAccessible(lowestQualityUrl);

  if (isLowestQualityUrlAccessible) {
    // If the 360p URL is accessible, return the main URL for 360p
    return {
      360: lowestQualityUrl,
      subtitles: metadata['subtitles'],
      slides: metadata['slides'],
      segments: metadata['segments'],
    };
  }

  // If none of the main URLs are accessible, return Bunny URLs
  return {
    1080: bunnyUrl(metadata[`video_1080p_mp4_${userId}`]),
    720: bunnyUrl(metadata[`video_720p_mp4_${userId}`]),
    360: bunnyUrl(metadata[`video_360p_mp4_${userId}`]),
    subtitles: metadata['subtitles'],
    slides: metadata['slides'],
    segments: metadata['segments'],
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
