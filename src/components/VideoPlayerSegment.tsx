'use client';
import React, { FunctionComponent, useRef } from 'react';
import { VideoPlayer } from '@/components/videoPlayer/VideoPlayer';

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
  const thumbnailPreviewRef = useRef<HTMLDivElement>(null);

  return (
    <div className="mb-6">
      <div className="flex-1 relative">
        <div
          id="thumbnail-preview"
          ref={thumbnailPreviewRef}
          className="hidden absolute bg-no-repeat bg-cover w-[320px] h-[180px] pointer-events-none z-10"
        />
        <VideoPlayer
          options={videoJsOptions}
          subtitles={subtitles}
          onVideoEnd={onVideoEnd}
          segments={segments}
          setQuality={setQuality}
          contentId={contentId}
        />
      </div>
    </div>
  );
};
