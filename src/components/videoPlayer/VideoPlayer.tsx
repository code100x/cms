'use client';
import React, { useEffect, useRef, useState } from 'react';
import VideoPlayerControls from './videoControls';

// mpdUrl => https://cloudfront.enet/video/video.mp4
// thumbnail => https://cloudfront.enet/video/thumbnail.jpg
// subtitles => https://cloudfront.enet/video/subtitles.vtt
//
export const VideoPlayer = ({
  options,
  subtitles,
  onVideoEnd,
}: {
  options: any;
  subtitles: string;
  onVideoEnd: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    window.setTimeout(() => {
      const player = (window as any).videojs(
        videoRef.current,
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
    }, 1000);

    return () => {};
  }, [videoRef.current]);

  return (
    <div className="relative group/v-container select-none rounded-md overflow-hidden">
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/video.js/7.11.7/video-js.min.css"
        rel="stylesheet"
      />
      <link
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
      ></script>

      <VideoPlayerControls player={player} onVideoEnd={onVideoEnd} />

      <video ref={videoRef} id="my-video" className="video-js">
        <track kind="subtitles" src={subtitles} srcLang="en" label="English" />
      </video>
    </div>
  );
};
