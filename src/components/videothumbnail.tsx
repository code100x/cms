import React, { useEffect, useMemo, useRef, useState } from 'react';
import VideoPreview from '@/actions/videopreview/videoPreview';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import Player from 'video.js/dist/types/player';

const VideoThumbnail = ({
  imageUrl,
  contentId,
}: {
  imageUrl: string;
  contentId: number;
}) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const player = playerRef.current;

  const source = useMemo(() => {
    if (videoUrl?.endsWith('.mpd')) {
      return {
        src: videoUrl,
        type: 'application/dash+xml',
        keySystems: {
          'com.widevine.alpha':
            'https://widevine-dash.ezdrm.com/proxy?pX=288FF5&user_id=MTAwMA==',
        },
      };
    } else if (videoUrl?.endsWith('.m3u8')) {
      return {
        src: videoUrl,
        type: 'application/x-mpegURL',
      };
    }
    return {
      src: videoUrl,
      type: 'video/mp4',
    };
  }, [videoUrl]);

  const videojsOptions = {
    autoplay: true,
    controls: true,
    fluid: true,
    sources: [source],
    muted: true,
    disablePictureInPicture: true,
    controlBar: {
      children: [
        'currentTimeDisplay',
        'timeDivider',
        'durationDisplay',
        'progressControl',
      ],
    },
  };

  useEffect(() => {
    async function fetchVideoUrl() {
      const url = await VideoPreview({ contentId });
      setVideoUrl(url);
    }
    fetchVideoUrl();
  }, [contentId]);
  const handleMouseEnter = () => {
    if (!timeoutRef.current) {
      timeoutRef.current = window.setTimeout(() => {
        setHover(true);
      }, 700);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHover(false);
  };

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');

      videoRef.current.appendChild(videoElement);
      playerRef.current = videojs(videoElement, videojsOptions);
    }
  }, [videojsOptions]);

  useEffect(() => {
    if (player) {
      const currentTime = player.currentTime();
      player.src(videojsOptions.sources[0]);
      player.currentTime(currentTime);
      player.autoplay(videojsOptions.autoplay);
    }
  }, [videojsOptions.sources[0]]);

  useEffect(() => {
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [handleMouseLeave]);

  return (
    <div
      className="m max-h-[573px] max-w-[1053px]  relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className=" w-full h-full relative">
        {hover && videoUrl ? (
          <div data-vjs-player>
            <div ref={videoRef} />
          </div>
        ) : (
          <img
            src={imageUrl}
            alt="Video Thumbnail"
            className=" w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default VideoThumbnail;
