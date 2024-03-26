'use client';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import { VideoPlayer } from '@/components/VideoPlayer2';
import {
  createSegmentMarkersWithoutDuration,
  getCurrentSegmentName,
} from '@/lib/utils';
import { Segment } from '@/lib/utils';
import Player from 'video.js/dist/types/player';
import { modalState } from '@/store/atoms/modal';
import { useRecoilState } from 'recoil';
import { DrawerState } from '@/store/atoms/drawers';

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
  const [, setModal] = useRecoilState(modalState); // modal
  const [bookmarkDrawer] = useRecoilState(DrawerState); // setBookmarkDrawer
  const playerRef = useRef<Player | null>(null);
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
  const bookmarkButton = (player: Player) => {
    const controlBar = player.getChild('ControlBar');
    if (controlBar && !document.querySelector('#vjs-bookmark-button')) {
      const bookmarkButton = controlBar
        ?.addChild(
          'button',
          {
            clickHandler: () => {
              player.pause();
              if (player.isFullscreen()) {
                player.exitFullscreen();
              }
              setModal({
                open: true,
                type: 'CreateVideoBookmark',
                data: {
                  bookmarkedTime: Math.floor(player.currentTime() || 0),
                  contentId,
                },
              });
            },
          },
          13,
        )
        ?.el();
      bookmarkButton.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bookmark-plus"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/><line x1="12" x2="12" y1="7" y2="13"/><line x1="15" x2="9" y1="10" y2="10"/></svg>';
      bookmarkButton?.setAttribute('aria-label', 'Bookmark');
      bookmarkButton?.classList.add('video-timestamp-bookmark-btn');
      bookmarkButton?.setAttribute('id', 'vjs-bookmark-button');
    }
  };
  const handlePlayerReady = async (player: Player) => {
    playerRef.current = player;
    createSegmentMarkersWithoutDuration(player, segments);
    overrideUpdateTime(player);
    bookmarkButton(player);
  };

  useEffect(() => {
    if (bookmarkDrawer.bookmarkData) {
      playerRef.current?.currentTime(bookmarkDrawer.bookmarkData.timestamp);
    }
  }, [bookmarkDrawer.bookmarkData]);

  return (
    <div className="">
      <div className="flex-1 relative">
        <div
          id="thumbnail-preview"
          ref={thumbnailPreviewRef}
          className="hidden absolute bg-no-repeat bg-cover w-[320px] h-[180px] pointer-events-none z-10"
        />
        <VideoPlayer
          setQuality={setQuality}
          contentId={contentId}
          subtitles={subtitles}
          options={videoJsOptions}
          onReady={handlePlayerReady}
          onVideoEnd={onVideoEnd}
        />
      </div>
    </div>
  );
};
