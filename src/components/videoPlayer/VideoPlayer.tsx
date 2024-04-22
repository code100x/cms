'use client';
import React, { useEffect, useRef, useState } from 'react';
import VideoPlayerControls from './videoControls';
import videojs from 'video.js';
import { Segment } from '@/lib/utils';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';
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
}: {
  options: any;
  subtitles: string;
  onVideoEnd: () => void;
  segments: Segment[];
  setQuality: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [player, setPlayer] = useState<any>(null);

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

  return (
    <div
      id="videoContainer"
      data-vjs-player
      className="relative group/v-container select-none rounded-md overflow-hidden md:max-w-[calc(100vw-3rem)] 2xl:max-w-[calc(100vw-17rem)]"
    >
      <VideoPlayerControls
        player={player}
        onVideoEnd={onVideoEnd}
        segments={segments}
        setQuality={setQuality}
        subtitles={subtitles}
      />
      <div ref={videoRef} className=""></div>
    </div>
  );
};
