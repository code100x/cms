'use client';
import React, { FunctionComponent, useRef } from 'react';
import { VideoPlayer } from '@/components/VideoPlayer2';
import {
  createSegmentMarkersWithoutDuration,
  getCurrentSegmentName,
} from '@/lib/utils';
import Player from 'video.js/dist/types/player';

import { Segment } from '@/lib/utils';

interface Thumbnail {
  public_id: string;
  version: number;
  url: string;
  secure_url: string;
  timestamp: number;
}

interface VideoProps {
  setQuality: React.Dispatch<React.SetStateAction<string>>;
  thumbnails: Thumbnail[];
  segments: Segment[];
  subtitles: string;
  videoJsOptions: any;
  contentId: number;
  appxVideoId?: string;
  appxCourseId?: string;
  onVideoEnd: () => void;
}

export const VideoPlayerSegment: FunctionComponent<VideoProps> = ({
  setQuality,
  contentId,
  subtitles,
  segments,
  videoJsOptions,
  onVideoEnd,
  appxVideoId,
  appxCourseId
}) => {
  const playerRef = useRef<Player | null>(null);
  const thumbnailPreviewRef = useRef<HTMLDivElement>(null);

  const generateThumbnail = (time: number) => {
    if (!playerRef.current) return;
    const video = playerRef.current.tech().el() as HTMLVideoElement;
    
    // Create an offscreen video element to extract frames
    const offscreenVideo = document.createElement("video");
    offscreenVideo.src = video.src;
    offscreenVideo.currentTime = time;
    offscreenVideo.muted = true;
    
    offscreenVideo.addEventListener("seeked", () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) return;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      ctx.drawImage(offscreenVideo, 0, 0, canvas.width, canvas.height);

      if (thumbnailPreviewRef.current) {
        thumbnailPreviewRef.current.style.backgroundImage = `url(${canvas.toDataURL()})`;
        thumbnailPreviewRef.current.style.display = "block";
      }
    }, { once: true });
  };

  const overrideUpdateTime = (player: Player) => {
    const seekBar = player
      .getChild('ControlBar')
      ?.getChild('ProgressControl')
      ?.getChild('SeekBar');

    if (seekBar) {
      const mouseTimeDisplay = seekBar.getChild('mouseTimeDisplay');
      if (mouseTimeDisplay) {
        const timeTooltip: any = mouseTimeDisplay.getChild('timeTooltip');
        if (timeTooltip) {
          timeTooltip.update = function(
            seekBarRect: any,
            seekBarPoint: any,
            time: string,
          ) {
            const segmentName = getCurrentSegmentName(time, segments);
            this.write(`${time} - ${segmentName}`);

            generateThumbnail(parseFloat(time));

            setTimeout(() => {
              const tooltipWidth = this.el().offsetWidth;
              this.el().style.right = `-${tooltipWidth / 2}px`;
              this.el().style.left = 'auto';
              this.el().style.width = '220px';
              this.el().style.fontSize = '14px';
            }, 0);
          };
        } 

        // Hide preview when mouse leaves seek bar
        seekBar.on('mouseout', () => {
          if (thumbnailPreviewRef.current) {
            thumbnailPreviewRef.current.style.display = 'none';
          }
        });
      }
    }
  };

  const handlePlayerReady = async (player: Player) => {
    playerRef.current = player;

    createSegmentMarkersWithoutDuration(player, segments);
    overrideUpdateTime(player);
  };

  return (
    <div className="mb-6">
      <div className="relative flex-1">
        <div
          id="thumbnail-preview"
          ref={thumbnailPreviewRef}
          className="pointer-events-none absolute z-10 hidden h-24 w-40 bg-cover bg-no-repeat rounded shadow-lg"
        />
        <VideoPlayer
          setQuality={setQuality}
          contentId={contentId}
          subtitles={subtitles}
          options={videoJsOptions}
          appxVideoId={appxVideoId}
          appxCourseId={appxCourseId}
          onVideoEnd={onVideoEnd}
          onReady={handlePlayerReady}
        />
      </div>
    </div>
  );
};
