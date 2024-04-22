'use client';
import React, { useEffect, useRef, useState } from 'react';
import VideoPlayerControls from './videoControls';
import videojs from 'video.js';
import { Segment } from '@/lib/utils';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    if (videoRef.current && player === null) {
      const player: any = videojs(
        videoRef.current as HTMLVideoElement,
        {
          ...options,
        },
        function () {
          setPlayer(player);

          player.eme();

          // @ts-ignore
          this.on('keystatuschange', (event: any) => {
            console.log('event: ', event);
          });
        },
      );
    }
  }, [options]);

  useEffect(() => {
    if (player) {
      const currentTime = player.currentTime();
      player.src(options.sources[0]);
      player.currentTime(currentTime);
    }
  }, [options.sources[0]]);

  return (
    <div
      id="videoContainer"
      className="relative group/v-container select-none rounded-md overflow-hidden flex items-center"
    >
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.11.7/video-js.min.css"
        rel="stylesheet"
      />
      {/* <link
        href="https://cdn.jsdelivr.net/npm/videojs-seek-buttons/dist/videojs-seek-buttons.css"
        rel="stylesheet"
      />
      <script
        defer
        src="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.11.7/video.min.js"
      ></script>
      <script
        defer
        src="https://cdn.jsdelivr.net/npm/videojs-contrib-eme@3.8.0/dist/videojs-contrib-eme.js"
      ></script>
      <script
        defer
        src="https://cdn.jsdelivr.net/npm/videojs-seek-buttons/dist/videojs-seek-buttons.min.js"
      ></script> */}

      <VideoPlayerControls
        player={player}
        onVideoEnd={onVideoEnd}
        segments={segments}
        setQuality={setQuality}
        subtitles={subtitles}
      />
      <video ref={videoRef} id="my-video" className="video-js"></video>
    </div>
  );
};
