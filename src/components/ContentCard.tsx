import React, { useState } from 'react';
import { handleMarkAsCompleted } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { Bookmark } from '@prisma/client';
import BookmarkButton from './bookmark/BookmarkButton';
import { formatTime } from '@/lib/utils';
import VideoThumbnail from './videothumbnail';
import CardComponent from './CardComponent';
import DonutChart from './DonutChart';

export const ContentCard = ({
  title,
  onClick,
  markAsCompleted,
  type,
  videoProgressPercent,
  hoverExpand = true,
  bookmark,
  contentId,
  contentDuration,
  createdAt,
  percentComplete,
}: {
  type: 'folder' | 'video' | 'notion';
  contentId?: number;
  image: string;
  title: string;
  onClick: () => void;
  markAsCompleted?: boolean;
  percentComplete?: number | null;
  videoProgressPercent?: number;
  hoverExpand?: boolean;
  bookmark?: Bookmark | null;
  contentDuration?: number;
  createdAt: Date;
}) => {
  const formattedDate = createdAt?.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  const [completed, setCompleted] = useState(markAsCompleted);

  const handleMarkAsCompletedClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (contentId) {
      handleMarkAsCompleted(!completed, contentId);
      setCompleted(!completed);
    }
  };

  return (
    <div
      onClick={onClick}
      className={`relative min-h-fit cursor-pointer rounded-lg border border-gray-700/50 duration-200 ease-in group${hoverExpand ? ' ' : ''} `}
    >
      {completed && (
        <div className="absolute right-2 top-2 z-10">
          <CheckCircle2 color="green" size={30} fill="lightgreen" />
        </div>
      )}
      {type === 'video' && contentId && (
        <div
          className="absolute bottom-[90px] left-[5px] z-10 rounded-md bg-white p-1 px-2 text-sm font-semibold text-black transition-all duration-300 dark:bg-zinc-800 dark:text-white hover:dark:bg-zinc-950"
          onClick={handleMarkAsCompletedClick}
        >
          {completed ? 'Mark as incomplete' : 'Mark as complete'}
        </div>
      )}
      {type !== 'video' && (
        <div className="relative overflow-hidden">
          <CardComponent
            title={title}
            contentDuration={contentDuration && formatTime(contentDuration)}
            type={type}
          />
          {!!videoProgressPercent && (
            <div className="absolute bottom-0 h-1 w-full bg-[#707071]">
              <div
                className="h-full bg-[#FF0101]"
                style={{ width: `${videoProgressPercent}%` }}
              />
            </div>
          )}
        </div>
      )}
      {type === 'video' && (
        <div className="relative overflow-hidden">
          <VideoThumbnail
            title={title}
            contentId={contentId ?? 0}
            contentDuration={contentDuration && formatTime(contentDuration)}
            imageUrl=""
          />
        </div>
      )}

      {bookmark !== undefined && contentId && (
        <div className="absolute left-1 top-4">
          <BookmarkButton
            bookmark={bookmark}
            contentId={contentId}
            size={28}
            align="start"
            side="bottom"
          />
        </div>
      )}
      <div className="flex items-center justify-between p-4">
        <div className="space-y-2">
          <h3 className="text-bold text-lg tracking-normal">{title}</h3>
          <h4 className="text-bold text-xs tracking-normal text-[#64748B]">
            Posted on: {formattedDate}
          </h4>
        </div>
        {type === 'folder' && percentComplete && (
          <div className="flex items-center justify-center">
            <DonutChart percentage={parseInt(percentComplete.toFixed(0), 10)} />
          </div>
        )}
        {type === 'video' && videoProgressPercent && (
          <div className="flex items-center justify-center">
            <DonutChart
              percentage={parseInt(videoProgressPercent.toFixed(0), 10)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
