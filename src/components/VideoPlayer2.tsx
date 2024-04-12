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

// Define the interface for video data
interface VideoData {
  mpdUrl: string;
  subtitles: string;
}

// Define the props interface
interface VideoPlayerProps {
  setQuality: React.Dispatch<React.SetStateAction<string>>;
  options: any;
  onReady?: (player: Player) => void;
  videoList: VideoData[];
  contentId: number;
  onVideoEnd: () => void;
}

const PLAYBACK_RATES: number[] = [0.5, 1, 1.25, 1.5, 1.75, 2];
const VOLUME_LEVELS: number[] = [0, 0.2, 0.4, 0.6, 0.8, 1.0];

export const VideoPlayer: FunctionComponent<VideoPlayerProps> = ({
  setQuality,
  options,
  videoList,
  contentId,
  onReady,
  onVideoEnd,
}) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<Player | null>(null);
  const [player, setPlayer] = useState<any>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState<number>(0);
  const searchParams = useSearchParams();
  
  // Initialize player
  useEffect(() => {
    if (!playerRef.current && videoRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      
      const currentVideo = videoList[currentVideoIndex];
      
      if (currentVideo.subtitles) {
        const subtitlesEl = document.createElement('track');
        subtitlesEl.setAttribute('kind', 'subtitles');
        subtitlesEl.setAttribute('label', 'English');
        subtitlesEl.setAttribute('srcLang', 'en');
        subtitlesEl.setAttribute('src', currentVideo.subtitles);
        videoElement.append(subtitlesEl);
      }
      
      videoRef.current.appendChild(videoElement);
      
      const player: any = (playerRef.current = videojs(
        videoElement,
        {
          ...options,
          playbackRates: PLAYBACK_RATES,
        },
        () => {
          player.mobileUi(); // Mobile UI
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
          
          setPlayer(player);
          
          // Set video source
          player.src({
            src: currentVideo.mpdUrl,
            type: currentVideo.mpdUrl.endsWith('.mpd') ? 'application/dash+xml' : 'video/mp4',
          });
          
          if (onReady) {
            onReady(player);
          }
          
          // Handle when video ends
          player.on('ended', handleVideoEnded);
        }
      ));
    }
  }, [videoRef, options, setQuality, onReady, currentVideoIndex, videoList]);
  
  // Handle video end event
  const handleVideoEnded = () => {
    // Mark the video as completed
    handleMarkAsCompleted(true, contentId);
    
    // Move to the next video
    if (currentVideoIndex < videoList.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
      // Reset the video player with the next video
      if (player) {
        player.src({
          src: videoList[currentVideoIndex + 1].mpdUrl,
          type: videoList[currentVideoIndex + 1].mpdUrl.endsWith('.mpd') ? 'application/dash+xml' : 'video/mp4',
        });
        
        player.load(); // Load the new video
        player.play(); // Play the new video
      }
    } else {
      // All videos are completed
      onVideoEnd();
    }
  };
  
  // Handle player clean up
  useEffect(() => {
    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [player]);
  
  return (
    <div
      data-vjs-player
      className="mx-auto md:max-w-[calc(100vw-3rem)] 2xl:max-w-[calc(100vw-17rem)]"
    >
      <div ref={videoRef} />
      {/* Button to manually navigate to the next video */}
      {currentVideoIndex < videoList.length - 1 && (
        <button onClick={() => setCurrentVideoIndex((prevIndex) => prevIndex + 1)}>
          Next Video
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;
