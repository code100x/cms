'use client';
import React, { useEffect, useRef, useState } from 'react';
import VideoPlayerControls from './videoControls';
import videojs from 'video.js';
import { Segment, handleMarkAsCompleted } from '@/lib/utils';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';
import { useSearchParams } from 'next/navigation';
import { YoutubeRenderer } from '../YoutubeRenderer';
// import 'videojs-mobile-ui/dist/videojs-mobile-ui.css';
// import 'videojs-mobile-ui';

// mpdUrl => https://cloudfront.enet/video/video.mp4
// thumbnail => https://cloudfront.enet/video/thumbnail.jpg
// subtitles => https://cloudfront.enet/video/subtitles.vtt
//
export const VideoPlayer = ({
  options,
  subtitles,
  onVideoEnd,
  segments,
  setQuality,
  contentId,
}: {
  options: any;
  subtitles: string;
  onVideoEnd: () => void;
  segments: Segment[];
  setQuality: React.Dispatch<React.SetStateAction<string>>;
  contentId: number;
}) => {
  const searchParams = useSearchParams();

  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    const t = searchParams.get('timestamp');
    if (contentId && player && !t) {
      fetch(`/api/course/videoProgress?contentId=${contentId}`).then(
        async (res) => {
          const json = await res.json();
          player.currentTime(json.progress || 0);
        },
      );
    }
  }, [contentId, player]);

  useEffect(() => {
    if (!player) {
      return;
    }
    let interval = 0;

    const handleVideoProgress = () => {
      if (!player) {
        return;
      }
      interval = window.setInterval(
        async () => {
          if (!player) {
            return;
          }
          if (player?.paused()) {
            return;
          }
          const currentTime = player.currentTime();
          if (currentTime <= 20) {
            return;
          }
          await fetch('/api/course/videoProgress', {
            body: JSON.stringify({
              currentTimestamp: currentTime,
              contentId,
            }),
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
        },
        Math.ceil((100 * 1000) / player.playbackRate()),
      );
    };

    const handleVideoEnded = (interval: number) => {
      handleMarkAsCompleted(true, contentId);
      window.clearInterval(interval);
      onVideoEnd();
    };

    player.on('play', handleVideoProgress);
    player.on('ended', () => handleVideoEnded(interval));
    return () => {
      window.clearInterval(interval);
    };
  }, [player, contentId]);

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = videoRef.current.appendChild(
        document.createElement('video-js'),
      );
      videoElement.classList.add('vjs-big-play-centered');

      const player: any = (playerRef.current = videojs(
        videoElement,
        options,
        () => {
          setPlayer(player);

          // player?.mobileUi(); // mobile ui #https://github.com/mister-ben/videojs-mobile-ui
          player?.eme();

          // @ts-ignore
          this.on('keystatuschange', (event: any) => {
            console.log('event: ', event);
          });
        },
      ));
    }
  }, [options]);

  useEffect(() => {
    if (player) {
      const currentTime = player.currentTime();
      player.src(options?.sources[0]);
      player.currentTime(currentTime);
    }
  }, [options?.sources[0]]);

  useEffect(() => {
    const playerInstance = playerRef?.current;

    return () => {
      if (playerInstance) {
        playerInstance.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const t = searchParams.get('timestamp');

    if (player && t) {
      player.currentTime(parseInt(t, 10));
    }
  }, [searchParams, player]);

  const isYoutubeUrl = (url: string) => {
    const regex = /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+/;
    return regex.test(url);
  };

  const vidUrl = options.sources[0].src;

  if (isYoutubeUrl(vidUrl)) {
    return <YoutubeRenderer url={vidUrl} />;
  }

  return (
    <div
      id="videoContainer"
      data-vjs-player
      className="group/v-container relative grid select-none overflow-hidden rounded-md md:max-w-[calc(100vw-3rem)] 2xl:max-w-[calc(100vw-17rem)]"
    >
      <VideoPlayerControls
        player={player}
        onVideoEnd={onVideoEnd}
        segments={segments}
        setQuality={setQuality}
        subtitles={subtitles}
      />
      <div ref={videoRef} className="self-center"></div>
    </div>
  );
};
