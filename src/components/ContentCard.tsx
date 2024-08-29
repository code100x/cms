import React, { useState } from 'react';
import { CheckCircle2, Play } from 'lucide-react';
import { handleMarkAsCompleted } from '@/lib/utils';
import { Bookmark } from '@prisma/client';
import BookmarkButton from './bookmark/BookmarkButton';
import { formatTime } from '@/lib/utils';
import VideoThumbnail from './videothumbnail';
import CardComponent from './CardComponent';

const PercentageRing = ({ percent }: { percent: number }) => {
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  return (
    <div className="relative h-12 w-12">
      <svg className="h-12 w-12" viewBox="0 0 40 40">
        <circle
          className="text-gray-300"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="18"
          cx="20"
          cy="20"
        />
        <circle
          className="text-blue-600"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="18"
          cx="20"
          cy="20"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium">{percent}%</span>
      </div>
    </div>
  );
};

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
}) => {
  // let image ;
  // image = ""
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
      className={`relative cursor-pointer rounded-lg border border-gray-700/50 duration-200 ease-in group${hoverExpand ? ' ' : ''} `}
    >
      {completed && (
        <div className="absolute right-2 top-2 z-10">
          <CheckCircle2 color="green" size={30} fill="lightgreen" />
        </div>
      )}
      {type === 'video' && (
        <div className="absolute bottom-[105px] right-[5px] z-10 rounded-md bg-white p-1 px-2 font-semibold text-black dark:bg-zinc-800 dark:text-white">
          {contentDuration && formatTime(contentDuration)}
        </div>
      )}
      {type !== 'video' && (
        <div className="relative overflow-hidden rounded-md">
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
        <div className="relative overflow-hidden rounded-md">
          <VideoThumbnail
            title={title}
            contentId={contentId ?? 0}
            imageUrl=""
            // imageUrl={
            //   'https://d2szwvl7yo497w.cloudfront.net/courseThumbnails/video.png'
            // }
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

      {type === 'video' && contentId && (
        <div
          className="absolute bottom-[105px] left-[5px] z-10 rounded-md bg-white p-1 px-2 text-sm font-semibold text-black transition-all duration-300 dark:bg-zinc-800 dark:text-white hover:dark:bg-zinc-950"
          onClick={handleMarkAsCompletedClick}
        >
          {completed ? 'Mark as incomplete' : 'Mark as complete'}
        </div>
      )}

      <div className="flex items-center justify-between p-4">
        <div className="space-y-2">
          <h3 className="text-bold text-lg tracking-normal">{title}</h3>
          <h4 className="text-bold text-sm tracking-normal text-[#64748B]">
            Posted on: 10 Aug 2024
          </h4>
        </div>
        {type === 'folder' ? (
          <>
            <PercentageRing percent={percentComplete ?? 0} />
          </>
        ) : (
          <>
            <div className="hidden rounded-full border border-gray-700/60 p-4 lg:block">
              <div className="rounded-full border border-[#64748b] p-2">
                <Play size={15} color="#64748b" />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
