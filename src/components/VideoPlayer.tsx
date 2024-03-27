import React, { useEffect, useRef, useState } from 'react';

export const VideoPlayer = ({
  mpdUrl,
  subtitles,
}: {
  mpdUrl: string;
  subtitles: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [player, setPlayer] = useState<any>(null);

  useEffect(() => {
    if (!player) return;

    const handleChapterChange = () => {
      if (player.hasOwnProperty('tech_')) {
        player.tech_.off('chapterchange', handleChapterChange);
        player.dispose();
        setPlayer(null);
        initializePlayer();
      }
    };

    player.ready(() => {
      player.tech_.on('chapterchange', handleChapterChange);
      player.playbackRate(1); // Reset playback rate to 1X
    });

    return () => {
      if (player) {
        player.tech_.off('chapterchange', handleChapterChange);
      }
    };
  }, [player, initializePlayer]);

  const initializePlayer = () => {
    const playerInstance = window.videojs(videoRef.current, {
      playbackrates: [0.5, 1, 1.25, 1.5, 1.75, 2],
      controls: true,
      fluid: true,
      html5: {
        vhs: {
          overridenative: true,
        },
      },
    });

    if (mpdUrl.endsWith('.mpd')) {
      playerInstance.src({
        src: mpdUrl,
        type: 'application/dash+xml',
      });
    } else if (mpdUrl.endsWith('.m3u8')) {
      playerInstance.src({
        src: mpdUrl,
        type: 'application/x-mpegURL',
      });
    } else {
      playerInstance.src({
        src: mpdUrl,
        type: 'video/mp4',
      });
    }

    playerInstance.addRemoteTextTrack(
      {
        kind: 'subtitles',
        src: subtitles,
        srclang: 'en',
        label: 'English',
      },
      false
    );

    setPlayer(playerInstance);

    playerInstance.on('keystatuschange', (event: any) => {
      console.log('Keystatus Change Event:', event);
    });

    playerInstance.seekButtons({
      forward: 10,
      back: 10,
    });

    playerInstance.playbackRate(1); // Set initial playback rate to 1X
  };

  useEffect(() => {
    if (!videoRef.current) return;
    initializePlayer();
  }, [mpdUrl, subtitles]);

  return (
    <div className="py-2">
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
      <video ref={videoRef} id="my-video" className="video-js">
        <track kind="subtitles" src={subtitles} srcLang="en" label="English" />
      </video>
    </div>
  );
};
