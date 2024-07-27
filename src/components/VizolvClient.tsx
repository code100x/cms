'use client';
import { useSession } from 'next-auth/react';
// @ts-ignore
import { Vizolv } from 'vizolv';

export default function VizolvClient() {
  const { data } = useSession();
  const user = data?.user;
  if (!user) {
    return null;
  }
  return (
    <>
      <Vizolv
        heading="100xdevs"
        buttonPosition={{
          bottom: 30,
          right: 30,
        }}
        buttonLabel="100xDevs1"
        // @ts-ignore
        timestampRedirectLink={({ start, video }) => {
          if (
            !(video && video.courseId && video.folderId && video.vid_100xdevs)
          )
            return;
          return `/courses/${video.courseId}/${video.folderId}/${video.vid_100xdevs}/?timestamp=${start}`;
        }}
      />
    </>
  );
}
