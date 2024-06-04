'use client';
import React, { useEffect, useRef, FunctionComponent, useState } from 'react';
import videojs from 'video.js';
import Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';
import 'videojs-contrib-eme';
import 'videojs-mobile-ui/dist/videojs-mobile-ui.css';
import 'videojs-seek-buttons/dist/videojs-seek-buttons.css';
import 'videojs-mobile-ui';
import 'videojs-sprite-thumbnails';
import 'videojs-seek-buttons';
import { handleMarkAsCompleted } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';
import './QualitySelectorControllBar';
import { YoutubeRenderer } from './YoutubeRenderer';

// todo correct types
interface VideoPlayerProps {
  setQuality: React.Dispatch<React.SetStateAction<string>>;
  options: any;
  onReady: (player: Player) => void;
  subtitles?: string;
  contentId: number;
  onVideoEnd: () => void;
}

export const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({
  setQuality,
  options,
  contentId,
  onReady,
  subtitles,
  onVideoEnd,
}) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<any>(null);
  const searchParams = useSearchParams();
  const vidUrl: string = options.sources[0].src;

  useEffect(() => {
    if (!player) {
      return;
    }
    const handleKeyPress = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;
      if (
        (activeElement &&
          (activeElement.tagName.toLowerCase() === 'input' ||
            activeElement.tagName.toLowerCase() === 'textarea')) ||
        event.ctrlKey
      ) {
        return; // Do nothing if the active element is an input or textarea
      }

      switch (event.code) {
        case 'Space':
        case 'KeyK': // play/pause
          event.preventDefault();
          if (player.paused()) {
            player.play();
          } else {
            player.pause();
          }
          event.stopPropagation();
          break;
        case 'ArrowRight': // Right arrow for seeking forward 5 seconds
          player.currentTime(player.currentTime() + 5);
          event.stopPropagation();
          break;
        case 'ArrowLeft': // Left arrow for seeking backward 5 seconds
          player.currentTime(player.currentTime() - 5);
          event.stopPropagation();
          break;
        case 'ArrowUp': // Arrow up for increasing volume
          event.preventDefault();
          player.volume(player.volume() + 0.1);
          event.stopPropagation();
          break;
        case 'ArrowDown': // Arow dowwn for decreasing volume
          event.preventDefault();
          player.volume(player.volume() - 0.1);
          event.stopPropagation();
          break;
        case 'KeyF': // F key for fullscreen
          if (player.isFullscreen_) document.exitFullscreen();
          else player.requestFullscreen();
          event.stopPropagation();
          break;
        case 'KeyR': // 'R' key to restart playback from the beginning
          player.currentTime(0);
          event.stopPropagation();
          break;
        case 'KeyM': // 'M' key to toggle mute/unmute
          if (player.volume() === 0) {
            player.volume(1);
          } else {
            player.volume(0);
          }
          event.stopPropagation();
          break;
        case 'KeyJ': // 'J' key for seeking backward 10 seconds multiplied by the playback rate
          player.currentTime(player.currentTime() - 10 * player.playbackRate());
          event.stopPropagation();
          break;
        case 'KeyL': // 'L' key for seeking forward 10 seconds multiplied by the playback rate
          player.currentTime(player.currentTime() + 10 * player.playbackRate());
          event.stopPropagation();
          break;
        case 'KeyC':
          if (subtitles && player.textTracks().length) {
            if (player.textTracks()[0].mode === 'showing') {
              player.textTracks()[0].mode = 'hidden';
            } else {
              player.textTracks()[0].mode = 'showing';
            }
          }
          event.stopPropagation();
          break;
        case 'KeyT':
          player.playbackRate(2);
          event.stopPropagation();
          break;
        case 'Digit1':
          player.currentTime(player.duration() * 0.1);
          event.stopPropagation();
          break;
        case 'Digit2':
          player.currentTime(player.duration() * 0.2);
          event.stopPropagation();
          break;
        case 'Digit3':
          player.currentTime(player.duration() * 0.3);
          event.stopPropagation();
          break;
        case 'Digit4':
          player.currentTime(player.duration() * 0.4);
          event.stopPropagation();
          break;
        case 'Digit5':
          player.currentTime(player.duration() * 0.5);
          event.stopPropagation();
          break;
        case 'Digit6':
          player.currentTime(player.duration() * 0.6);
          event.stopPropagation();
          break;
        case 'Digit7':
          player.currentTime(player.duration() * 0.7);
          event.stopPropagation();
          break;
        case 'Digit8':
          player.currentTime(player.duration() * 0.8);
          event.stopPropagation();
          break;
        case 'Digit9':
          player.currentTime(player.duration() * 0.9);
          event.stopPropagation();
          break;
        case 'Digit0':
          player.currentTime(0);
          event.stopPropagation();
          break;
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.code === 'KeyT') {
        player.playbackRate(1);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [player]);

  useEffect(() => {
    if (!player) {
      return;
    }
    const timeStamp = searchParams.get('timestamp');
    if (timeStamp) {
      player.currentTime(parseInt(timeStamp, 10));
    } else {
      fetch(`/api/course/videoProgress?contentId=${contentId}`).then(
        async (res) => {
          const json = await res.json();
          player.currentTime(json.progress || 0);
        },
      );
    }
    let interval = 0;

    const handleVideoProgress = () => {
      interval = window.setInterval(
        async () => {
          if (!player || player.paused() || player.currentTime() <= 20) {
            return;
          }
          await fetch('/api/course/videoProgress', {
            body: JSON.stringify({
              currentTimestamp: player.currentTime(),
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
      player.dispose();
      setPlayer(null);
    };
  }, [player]);

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }
    const videoElement = document.createElement('video-js');
    videoElement.classList.add('vjs-big-play-centered');
    if (subtitles) {
      const subtitlesEl = document.createElement('track');
      subtitlesEl.setAttribute('kind', 'subtitles');

      subtitlesEl.setAttribute('label', 'English');
      subtitlesEl.setAttribute('srcLang', 'en');
      subtitlesEl.setAttribute('src', subtitles);

      videoElement.append(subtitlesEl);
    }
    videoRef.current.appendChild(videoElement);
    const localPlayer: any = videojs(videoElement, { ...options }, () => {
      localPlayer.mobileUi();
      localPlayer.eme();
      localPlayer.seekButtons({
        forward: 15,
        back: 15,
      });

      localPlayer.qualitySelector = setQuality;
      const qualitySelector = localPlayer.controlBar.addChild(
        'QualitySelectorControllBar',
      );
      const controlBar = localPlayer.getChild('controlBar');
      const fullscreenToggle = controlBar.getChild('fullscreenToggle');

      controlBar.el().insertBefore(qualitySelector.el(), fullscreenToggle.el());

      setPlayer(localPlayer);

      if (options.isComposite) {
        localPlayer.spriteThumbnails({
          interval: options.delta,
          url: options.thumbnail.secure_url,
          width: options.width,
          height: options.height,
        });
      }
      localPlayer.on('loadedmetadata', () => {
        onReady(localPlayer);
      });
      localPlayer.on('fullscreenchange', () => {
        videoElement.focus();
      });
    });

    return () => {
      localPlayer.dispose();
    };
  }, []);

  const isYoutubeUrl = (url: string) => {
    const regex = /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+/;
    return regex.test(url);
  };

  if (isYoutubeUrl(vidUrl)) {
    return <YoutubeRenderer url={vidUrl} />;
  }

  return (
    <div
      data-vjs-player
      className="mx-auto md:max-w-[calc(100vw-3rem)] 2xl:max-w-[calc(100vw-17rem)]"
      ref={videoRef}
    ></div>
  );
};

export default VideoPlayer;
