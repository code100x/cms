'use client';
import React, { useEffect, useRef, FunctionComponent, useState } from 'react';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-eme';
import 'videojs-mobile-ui/dist/videojs-mobile-ui.css';
import 'videojs-mobile-ui';
import 'videojs-sprite-thumbnails';

// todo correct types
interface VideoPlayerProps {
  options: any;
  onReady?: (player: Player) => void;
  subtitles?: string;
  contentId: number;
}

export const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({
  options,
  contentId,
  onReady,
  subtitles
}) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const [startTime, setStartTime] = useState(0);

  useEffect(() => {
    if (contentId && player) {
      fetch(`/api/course/videoProgress?contentId=${contentId}`).then(async res => {
        const json = await res.json();
        setStartTime(json.progress || 0)
        player.currentTime(json.progress || 0)
      })
    }
  }, [contentId, player])

  useEffect(() => {
    if (!player) {
      return;
    }
    const handleKeyPress = (event: any) => {
      switch (event.code) {
        case 'Space': // Space bar for play/pause
          if (player.paused()) {
            player.play();
            event.stopPropagation();
          } else {
            player.pause();
            event.stopPropagation();
          }
          event.preventDefault()
          break;
        case 'ArrowRight': // Right arrow for seeking forward 5 seconds
          player.currentTime(player.currentTime() + 5);
          event.stopPropagation();
          break;
        case 'ArrowLeft': // Left arrow for seeking backward 5 seconds
          player.currentTime(player.currentTime() - 5);
          event.stopPropagation();
          break;
        case 'KeyF': // F key for fullscree
          if (player.isFullscreen_) {
            document.exitFullscreen()
          } else {
            player.requestFullscreen();
          }
          event.stopPropagation();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [player])

  useEffect(() => {
    const interval = window.setInterval(async () => {
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
          'Content-Type': 'application/json'
        }
      })

    }, 10 * 1000)

    return () => {
      window.clearInterval(interval)
    }
  }, [player, contentId])

  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      if (subtitles) {
        const subtitlesEl = document.createElement("track")
        subtitlesEl.setAttribute("kind", "subtitles")

        subtitlesEl.setAttribute("label", "English")
        subtitlesEl.setAttribute("srcLang", "en")
        subtitlesEl.setAttribute("src", subtitles)

        videoElement.append(subtitlesEl)
      }
      videoRef.current.appendChild(videoElement);
      const player: any = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          playbackRates: [0.5, 1, 1.25, 1.5, 1.75, 2],
        },
        () => {
          player.mobileUi(); // mobile ui #https://github.com/mister-ben/videojs-mobile-ui
          player.eme(); // Initialize EME
          setPlayer(player);
          if (options.isComposite) {
            player.spriteThumbnails({
              interval: options.delta,
              url: options.thumbnail.secure_url,
              width: options.width,
              height: options.height,
            });
          }
          player.on('loadedmetadata', () => {
            if (onReady) {
              onReady(player);
            }
          });
        }
      ));

      if (
        options.sources &&
        options.sources[0].type.includes('application/dash+xml')
      ) {
        player.src(options.sources[0]);
      }
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
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;
