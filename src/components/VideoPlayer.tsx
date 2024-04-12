import React, { useEffect, useRef, useState } from 'react';
import videojs, { VideoJsPlayer, VideoJsPlayerOptions } from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-seek-buttons/dist/videojs-seek-buttons.css';
import 'videojs-seek-buttons';

interface VideoPlayerProps {
  mpdUrl: string;
  subtitles: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ mpdUrl, subtitles }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [player, setPlayer] = useState<VideoJsPlayer | null>(null);

  const initializePlayer = () => {
    if (!videoRef.current) return;

    const options: VideoJsPlayerOptions = {
      playbackRates: [0.5, 1, 1.25, 1.5, 1.75, 2],
      controls: true,
      fluid: true,
      html5: {
        vhs: {
          overrideNative: true,
        },
      },
    };

    const playerInstance = videojs(videoRef.current, options);

    const videoType = mpdUrl.endsWith('.mpd')
      ? 'application/dash+xml'
      : mpdUrl.endsWith('.m3u8')
        ? 'application/x-mpegURL'
        : 'video/mp4';

    playerInstance.src({
      src: mpdUrl,
      type: videoType,
    });

    playerInstance.addRemoteTextTrack(
      {
        kind: 'subtitles',
        src: subtitles,
        srclang: 'en',
        label: 'English',
      },
      false
    );

    // Initialize player
    playerInstance.on('chapterchange', handleChapterChange);
    playerInstance.on('keystatuschange', (event: unknown) => {
      console.log('Keystatus Change Event:', event);
    });
    playerInstance.seekButtons({ forward: 10, back: 10 });
    playerInstance.playbackRate(1); // Set initial playback rate to 1x

    setPlayer(playerInstance);
  };

  // Handle chapter changes
  const handleChapterChange = () => {
    if (player) {
      player.tech().off('chapterchange', handleChapterChange);
      player.dispose();
      setPlayer(null);
      initializePlayer();
    }
  };

  useEffect(() => {
    initializePlayer();

    return () => {
      if (player) {
        player.dispose();
      }
    };
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
