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

// todo correct types
interface VideoPlayerProps {
  options: any;
  onReady?: (player: Player) => void;
  subtitles?: string;
  contentId: number;
  onVideoEnd: () => void;
}

const PLAYBACK_RATES: number[] = [0.5, 1, 1.25, 1.5, 1.75, 2];
const VOLUME_LEVELS: number[] = [0, 0.2, 0.4, 0.6, 0.8, 1.0];

export const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({
  options,
  contentId,
  onReady,
  subtitles,
  onVideoEnd,
}) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const searchParams = useSearchParams();
  useEffect(() => {
    if (contentId && player) {
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
    let volumeSetTimeout: ReturnType<typeof setInterval> | null = null;
    const handleKeyPress = (event: any) => {
      const isShiftPressed = event.shiftKey;
      if (isShiftPressed) {
        const currentIndexPeriod: number = PLAYBACK_RATES.indexOf(
          player.playbackRate(),
        );
        const newIndexPeriod: number =
          currentIndexPeriod !== PLAYBACK_RATES.length - 1
            ? currentIndexPeriod + 1
            : currentIndexPeriod;
        const currentIndexComma = PLAYBACK_RATES.indexOf(player.playbackRate());
        const newIndexComma =
          currentIndexComma !== 0 ? currentIndexComma - 1 : currentIndexComma;
        const currentIndexUp = VOLUME_LEVELS.indexOf(player.volume());
        const newIndexUp =
          currentIndexUp !== VOLUME_LEVELS.length - 1
            ? currentIndexUp + 1
            : currentIndexUp;
        const currentIndexDown = VOLUME_LEVELS.indexOf(player.volume());
        const newIndexDown =
          currentIndexDown !== 0 ? currentIndexDown - 1 : currentIndexDown;
        switch (event.code) {
        case 'Period': // Increase playback speed
          player.playbackRate(PLAYBACK_RATES[newIndexPeriod]);
          event.stopPropagation();
          break;
        case 'Comma': // Decrease playback speed
          player.playbackRate(PLAYBACK_RATES[newIndexComma]);
          event.stopPropagation();
          break;
        case 'ArrowUp': // Increase volume
          videoRef.current?.children[0].children[6].children[3].classList.add(
            'vjs-hover',
          );
          if (volumeSetTimeout !== null) clearTimeout(volumeSetTimeout);
          volumeSetTimeout = setTimeout(() => {
            videoRef.current?.children[0].children[6].children[3].classList.remove(
              'vjs-hover',
            );
          }, 1000);
          player.volume(VOLUME_LEVELS[newIndexUp]);
          event.stopPropagation();
          break;
        case 'ArrowDown': // Decrease volume
          videoRef.current?.children[0].children[6].children[3].classList.add(
            'vjs-hover',
          );
          if (volumeSetTimeout !== null) clearTimeout(volumeSetTimeout);
          volumeSetTimeout = setTimeout(() => {
            videoRef.current?.children[0].children[6].children[3].classList.remove(
              'vjs-hover',
            );
          }, 1000);
          player.volume(VOLUME_LEVELS[newIndexDown]);
          event.stopPropagation();
          break;
        }
      } else {
        const activeElement = document.activeElement;

        // Check if there is an active element and if it's an input or textarea
        if (
          activeElement &&
          (activeElement.tagName.toLowerCase() === 'input' ||
            activeElement.tagName.toLowerCase() === 'textarea')
        ) {
          return; // Do nothing if the active element is an input or textarea
        }
        switch (event.code) {
        case 'Space': // Space bar for play/pause
          if (player.paused()) {
            player.play();
            event.stopPropagation();
          } else {
            player.pause();
            event.stopPropagation();
          }
          event.preventDefault();
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
          if (player.isFullscreen_) document.exitFullscreen();
          else player.requestFullscreen();
          event.stopPropagation();
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [player]);

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
      const player: any = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          playbackRates: [0.5, 1, 1.25, 1.5, 1.75, 2],
        },
        () => {
          player.mobileUi(); // mobile ui #https://github.com/mister-ben/videojs-mobile-ui
          player.eme(); // Initialize EME
          player.seekButtons({
            forward: 15,
            back: 15,
          });

          const qualitySelector = player.controlBar.addChild(
            'QualitySelectorControllBar',
          );
          const controlBar = player.getChild('controlBar');
          const fullscreenToggle = controlBar.getChild('fullscreenToggle');

          controlBar
            .el()
            .insertBefore(qualitySelector.el(), fullscreenToggle.el());
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
        },
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

  useEffect(() => {
    const t = searchParams.get('timestamp');

    if (playerRef.current && t) {
      playerRef.current.currentTime(parseInt(t, 10));
    }
  }, [searchParams, playerRef.current]);
  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;
