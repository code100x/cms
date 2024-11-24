'use client';
import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import VideoPlayer3 from '@/components/VideoPlayer3';
import {
  createSegmentMarkersWithoutDuration,
  getCurrentSegmentName,
} from '@/lib/utils';
import Player from 'video.js/dist/types/player';

import { Segment } from '@/lib/utils';
import VideoPlayer from './VideoPlayer2';

export interface Thumbnail {
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
}) => {
  const playerRef = useRef<Player | null>(null);
  const [currentOrigin, setCurrentOrigin] = useState('');

  const thumbnailPreviewRef = useRef<HTMLDivElement>(null);

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
          timeTooltip.update = function (
            seekBarRect: any,
            seekBarPoint: any,
            time: string,
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
              this.el().style.width = '200px';
              this.el().style.fontSize = '14px';
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

  const vidSource: string = videoJsOptions.sources[0].src;

  useEffect(() => {
    if (window.location.origin) {
      setCurrentOrigin(window.location.origin);
    }
  }, [window.location]);

  return (
    <div className="mb-6">
      <div className="relative flex-1">
        <div
          id="thumbnail-preview"
          ref={thumbnailPreviewRef}
          className="pointer-events-none absolute z-10 hidden h-[180px] w-[320px] bg-cover bg-no-repeat"
        />
        {currentOrigin.length > 1 &&
        vidSource.startsWith(currentOrigin + '/video/') ? (
          <VideoPlayer3 options={videoJsOptions} />
        ) : (
          <VideoPlayer
            setQuality={setQuality}
            contentId={contentId}
            subtitles={subtitles}
            options={videoJsOptions}
            appxVideoId={appxVideoId}
            onVideoEnd={onVideoEnd}
            onReady={handlePlayerReady}
          />
        )}
      </div>
    </div>
  );
};
