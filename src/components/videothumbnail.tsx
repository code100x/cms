'use client';
import React, { useEffect, useRef, useState } from 'react';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-eme';
import 'videojs-mobile-ui/dist/videojs-mobile-ui.css';
import VideoPreview from '@/actions/videopreview/videoPreview';

export const VideoRender = ({ options, onReady }: any) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);
      const player: any = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
        },
        () => {
          player.mobileUi(); // mobile ui #https://github.com/mister-ben/videojs-mobile-ui
          player.eme(); // Initialize EME
          player.on('loadedmetadata', () => {
            if (onReady) {
              onReady(player);
            }
          });
        },
      ));
    }
  }, [options, onReady]);

  useEffect(() => {
    const player = playerRef.current;
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <div
      data-vjs-player
      className="mx-auto md:max-w-[calc(100vw-3rem)] 2xl:max-w-[calc(100vw-17rem)]"
    >
      <div ref={videoRef} />
    </div>
  );
};

const VideoThumbnail = ({
  imageUrl,
  contentId,
}: {
  imageUrl: string;
  contentId: number;
}) => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoType, setVideoType] = useState<string | null>(null);
  const [hover, setHover] = useState(false);
  const playerRef = useRef(null);
  useEffect(() => {
    let isMounted = true;

    const fetchVideoUrl = async () => {
      if (contentId !== undefined) {
        try {
          const url = await VideoPreview({ contentId });
          if (isMounted && url) {
            setVideoUrl(url);
            if (url.endsWith('.mpd')) {
              setVideoType('application/dash+xml');
            } else if (url.endsWith('.m3u8')) {
              setVideoType('application/x-mpegURL');
            } else if (url.endsWith('.mp4')) {
              setVideoType('video/mp4');
            } else {
              setVideoType('application/dash+xml');
            }
          }
        } catch (error) {
          console.error('Failed to fetch video URL', error);
        }
      }
    };

    fetchVideoUrl();

    return () => {
      isMounted = false;
      setVideoUrl(null);
    };
  }, [contentId]);
  let hoverTimeout: any;
  const handleMouseEnter = () => {
    hoverTimeout = setTimeout(() => {
      setHover(true);
    }, 500);
    setHover(true);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    setHover(false);
  };
  const handlePlayerReady = async (player: Player) => {
    //@ts-ignore
    playerRef.current = player;
  };
  const videoJsOptions = {
    sources: [
      {
        src: videoUrl,
        type: videoType,
      },
    ],
    muted: true,
    autoplay: true,
    controls: false,
    preload: 'auto',
    fluid: true,
  };

  return (
    <div className="max-h-[573px] max-w-[1053px] relative">
      <div
        className="w-full h-full relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {hover && videoUrl ? (
          <VideoRender options={videoJsOptions} onReady={handlePlayerReady} />
        ) : (
          <img
            src={imageUrl}
            alt="Video Thumbnail"
            className="h-full w-full object-cover"
          />
        )}
      </div>
    </div>
  );
};

export default VideoThumbnail;
