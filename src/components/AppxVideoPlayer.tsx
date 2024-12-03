'use client';
import { GetAppxVideoPlayerUrl } from '@/actions/user';
import { signOut } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

export const AppxVideoPlayer = ({
  courseId,
  videoId,
}: {
  courseId: string;
  videoId: string;
}) => {
  const [url, setUrl] = useState('');
  const doneRef = useRef(false);

  useEffect(() => {
    (async () => {
      if (doneRef.current) return;
      doneRef.current = true;
      try {
        const videoUrl = await GetAppxVideoPlayerUrl(courseId, videoId);
        setUrl(videoUrl);
      } catch {
        toast.info('This is a new type of video player', {
          description: 'Please relogin to continue',
          action: {
            label: 'Relogin',
            onClick: () => signOut(),
          },
        });
      }
    })();
  }, []);

  if (!url.length) {
    return <p>Loading...</p>;
  }
  return <iframe
    src={url}
    className="h-[80vh] w-[80vw] rounded-lg"
    allowFullScreen
  ></iframe >;
};
