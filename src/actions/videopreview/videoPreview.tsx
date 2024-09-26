'use server';
// import db from '@/db';

export default async function VideoPreview({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  contentId,
}: {
  contentId: number;
}) {
  // const videoMetadata = await db.videoMetadata.findFirst({
  //   where: { contentId },
  //   select: { video_360p_1: true },
  // });

  // if (videoMetadata) {
  //   return videoMetadata.video_360p_1;
  // }
  return null;
}
