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
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

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

  useEffect(() => {
    if(typeof window === 'undefined') {
      return;
    }
    window.addEventListener('keydown', handleKeyPressIframe);
    return () => {
      window.removeEventListener('keydown', handleKeyPressIframe);
    };
  }, []);

  const handleKeyPressIframe = (event: KeyboardEvent) => {
    switch(event.code) {
      case 'KeyF':
        event.preventDefault();
        if (!iframeRef.current) {
          return;
        }
        if (iframeRef.current) {
        if(!document.fullscreenElement) {
          iframeRef.current.requestFullscreen();
        }
        else if(document.fullscreenElement){
          document.exitFullscreen();
        }
      }      
    }
  };

  if (!url.length) {
    return <p>Loading...</p>;
  }
  return <iframe
    ref={iframeRef}
    src={url}
    className="w-full rounded-lg aspect-video"
    allowFullScreen
  ></iframe >;
};
