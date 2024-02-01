'use client';
import React, {
  FunctionComponent,
  useRef,
  useState,
} from 'react';
import { VideoPlayer } from '@/components/VideoPlayer2';

import {
  createSegmentMarkersWithoutDuration,
  formatTime,
  getCurrentSegmentName,
} from '@/lib/utils';
import { Segment } from '@/lib/utils';
import Player from 'video.js/dist/types/player';

export interface Thumbnail {
  public_id: string;
  version: number;
  url: string;
  secure_url: string;
  timestamp: number;
}

interface VideoProps {
  thumbnails: Thumbnail[];
  segments: Segment[];
  subtitles: string;
  videoJsOptions: any;
  contentId: number;
}

export const VideoPlayerSegment: FunctionComponent<VideoProps> = ({
  contentId,
  thumbnails,
  subtitles,
  segments,
  videoJsOptions,
}) => {
  const playerRef = useRef<Player | null>(null);
  const thumbnailPreviewRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
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
            time: string
          ) {
            const segmentName = getCurrentSegmentName(time, segments);
            this.write(`${time} - ${segmentName}`);

            // Delay the execution to ensure the tooltip width is calculated after the content update
            setTimeout(() => {
              const tooltipWidth = this.el().offsetWidth;
              // Calculate the offset from the right side
              const rightOffset = tooltipWidth / 2;
              this.el().style.right = `-${rightOffset}px`;

              // Adjust the left style to 'auto' to avoid conflict with the right property
              this.el().style.left = 'auto';
              this.el().style.width = '200px'
              this.el().style.fontSize = '14px'
            }, 0);
          };
        } else {
          console.error('TimeTooltip component not found.');
        }
      } else {
        console.error('MouseTimeDisplay component not found.');
      }
    } else {
      console.error('SeekBar component not found.');
    }
  };
  const handlePlayerReady = async (player: Player) => {
    playerRef.current = player;

    createSegmentMarkersWithoutDuration(player, segments);
    overrideUpdateTime(player);
  };
  const scrollTopSegment = (index: number) => {
    if (playerRef.current) {
      // Access the player API to set the current time to the start of the segment
      const segmentStartTime = segments[index].start;
      playerRef.current.currentTime(segmentStartTime);
    }
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="">
      <div className="flex-1 relative">
        <div
          id="thumbnail-preview"
          ref={thumbnailPreviewRef}
          className="hidden absolute bg-no-repeat bg-cover w-[320px] h-[180px] pointer-events-none z-10"
        />
        <VideoPlayer contentId={contentId} subtitles={subtitles} options={videoJsOptions} onReady={handlePlayerReady} />
      </div>
    </div>
  );
};
