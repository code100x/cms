'use server';
import db from '@repo/db/client';

export default async function VideoPreview({
  contentId,
}: {
  contentId: number;
}) {
  const videoMetadata = await db.videoMetadata.findFirst({
    where: { contentId },
    select: { video_360p_1: true },
  });

  if (videoMetadata) {
    return videoMetadata.video_360p_1;
  }
  return null;
}
