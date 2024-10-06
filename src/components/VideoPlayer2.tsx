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
import { toast } from 'sonner';
import { createRoot } from 'react-dom/client';
import { PictureInPicture2 } from 'lucide-react';

// todo correct types
interface VideoPlayerProps {
  setQuality: React.Dispatch<React.SetStateAction<string>>;
  options: any;
  onReady?: (player: Player) => void;
  subtitles?: string;
  contentId: number;
  onVideoEnd: () => void;
}

const PLAYBACK_RATES: number[] = [0.5, 1, 1.25, 1.5, 1.75, 2];
const VOLUME_LEVELS: number[] = [0, 0.2, 0.4, 0.6, 0.8, 1.0];

export const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({
  setQuality,
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
  const vidUrl = options.sources[0].src;

  const togglePictureInPicture = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (document.pictureInPictureEnabled && playerRef.current) {
        playerRef.current.requestPictureInPicture();
      }
    } catch (error) {
      // Ignore specific errors that might occur during normal operation
      if (
        error instanceof Error &&
        error.name !== 'NotAllowedError' &&
        error.name !== 'NotSupportedError'
      ) {
        console.error('Failed to toggle Picture-in-Picture mode:', error);
        toast.error('Failed to toggle Picture-in-Picture mode.');
      }
    }
  };

  const PipButton = () => (
    <button
      onClick={togglePictureInPicture}
      className="flex items-center justify-center text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-gray-800"
      type="button"
      title="Picture-in-Picture"
    >
      <span className="absolute inset-0 rounded bg-black bg-opacity-50 opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>
      <PictureInPicture2 className="relative z-10 h-5 w-5" />
      <span className="sr-only">Picture-in-Picture</span>
    </button>
  );

  const createPipButton = (player: Player) => {
    const pipButtonContainer = (player as any).controlBar.addChild('button', {
      clickHandler: (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        togglePictureInPicture();
      },
    });

    const root = createRoot(pipButtonContainer.el());
    root.render(<PipButton />);

    return pipButtonContainer;
  };

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
    let volumeSetTimeout: ReturnType<typeof setInterval> | null = null;
    const handleKeyPress = (event: KeyboardEvent) => {
      const isShiftPressed = event.shiftKey;
      const isModifierPressed = event.metaKey || event.ctrlKey || event.altKey;
      const activeElement = document.activeElement;

      const tracks: TextTrackList = player.textTracks();

      if (
        activeElement?.tagName.toLowerCase() === 'input' ||
        activeElement?.tagName.toLowerCase() === 'textarea' ||
        isModifierPressed
      ) {
        return; // Do nothing if the active element is an input or textarea
      }
      if (event.code === 'KeyT') {
        player.playbackRate(2);
      }
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
        return;
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
        case 'KeyK': // 'K' key for play/pause toggle
          if (player.paused()) {
            player.play();
          } else {
            player.pause();
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
        case 'KeyP': // 'P' key to toggle picture-in-picture(pip) mode
          togglePictureInPicture();
          event.stopPropagation();
          break;
        case 'KeyC':
          for (let i = 0; i < tracks.length; i++) {
            const track = tracks[i];

            if (track.kind === 'subtitles' && track.language === 'en') {
              if (track.mode === 'hidden') {
                track.mode = 'showing';
              } else {
                track.mode = 'hidden';
              }
            }
          }
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
    const handleKeyUp = (event: any) => {
      if (event.code === 'KeyT') {
        player.playbackRate(1);
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyUp);
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
          if (!player) {
            return;
          }
          //@ts-ignore
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

          player.qualitySelector = setQuality;
          const qualitySelector = player.controlBar.addChild(
            'QualitySelectorControllBar',
          );
          const controlBar = player.getChild('controlBar');
          const fullscreenToggle = controlBar.getChild('fullscreenToggle');

          controlBar
            .el()
            .insertBefore(qualitySelector.el(), fullscreenToggle.el());

          const pipButton = createPipButton(player);
          controlBar.el().insertBefore(pipButton.el(), fullscreenToggle.el());

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
          // Focus the video player when toggling fullscreen
          player.on('fullscreenchange', () => {
            videoElement.focus();
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
    if (player) {
      const currentTime = player.currentTime();
      player.src(options.sources[0]);
      player.currentTime(currentTime);
    }
  }, [options.sources[0]]);

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

    if (player && t) {
      player.currentTime(parseInt(t, 10));
    }
  }, [searchParams, player]);

  const isYoutubeUrl = (url: string) => {
    const regex = /^https:\/\/www\.youtube\.com\/embed\/[a-zA-Z0-9_-]+/;
    return regex.test(url);
  };

  if (isYoutubeUrl(vidUrl)) {
    return <YoutubeRenderer url={vidUrl} />;
  }

  return (
    <div data-vjs-player className="mx-auto">
      <div ref={videoRef} />
    </div>
  );
};

export default VideoPlayer;
