'use client';
import React, { FunctionComponent } from 'react';
import { VideoPlayer } from '@/components/VideoPlayer2';
import {
  createSegmentMarkersWithoutDuration,
  getCurrentSegmentName,
} from '@/lib/utils';
import Player from 'video.js/dist/types/player';

import { Segment } from '@/lib/utils';

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
  onVideoEnd: () => void;
}

export const VideoPlayerSegment: FunctionComponent<VideoProps> = ({
  setQuality,
  contentId,
  subtitles,
  segments,
  videoJsOptions,
  onVideoEnd,
}) => {
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
            this.el().style.width = 'max-content';
            this.el().style.height = 'min-content';
            this.el().style.fontSize = '14px';
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
  const handlePlayerReady = (player: Player) => {
    createSegmentMarkersWithoutDuration(player, segments);
    overrideUpdateTime(player);
  };

  return (
    <div className="mb-6">
      <div className="flex-1 relative">
        <div
          id="thumbnail-preview"
          className="hidden absolute bg-no-repeat bg-cover w-[320px] h-[180px] pointer-events-none z-10"
        />
        <VideoPlayer
          setQuality={setQuality}
          contentId={contentId}
          subtitles={subtitles}
          options={videoJsOptions}
          onVideoEnd={onVideoEnd}
          onReady={handlePlayerReady}
        />
      </div>
    </div>
  );
};
