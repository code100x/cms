'use server';
import db from '@/db';

export default async function VideoPreview({
  contentId,
}: {
  contentId: number | undefined;
}) {
  if (!contentId) return null;
  const videoMetadata = await db.videoMetadata.findFirst({
    where: { contentId },
    select: {
      video_360p_1: true,
      video_360p_2: true,
      video_360p_3: true,
      video_360p_4: true,
    },
  });
  if (!videoMetadata) return null;
  const videoUrl =
    videoMetadata.video_360p_1 ||
    videoMetadata.video_360p_2 ||
    videoMetadata.video_360p_3 ||
    videoMetadata.video_360p_4;

  return videoUrl;
}
