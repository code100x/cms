import { CheckCircle2, Play } from 'lucide-react';
import { Bookmark } from '@prisma/client';
import BookmarkButton from './bookmark/BookmarkButton';
import { formatTime } from '@/lib/utils';
import VideoThumbnail from './videothumbnail';
import CardComponent from './CardComponent';
import { motion } from 'framer-motion';

export const ContentCard = ({
  title,
  onClick,
  markAsCompleted,
  type,
  videoProgressPercent,
  bookmark,
  contentId,
  contentDuration,
}: {
  type: 'folder' | 'video' | 'notion';
  contentId?: number;
  image: string;
  title: string;
  onClick: () => void;
  markAsCompleted?: boolean;
  percentComplete?: number | null;
  videoProgressPercent?: number;
  bookmark?: Bookmark | null;
  contentDuration?: number;
  uploadDate?: string;
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`relative flex h-full w-full cursor-pointer flex-col gap-2 rounded-2xl`}
    >
      {markAsCompleted && (
        <div className="absolute right-2 top-2 z-10">
          <CheckCircle2 className="size-6 text-neutral-800" fill="#22c55e" />
        </div>
      )}
      {type === 'video' && (
        <div className="absolute bottom-12 right-2 z-10 p-2 font-semibold text-white">
          <Play className="size-6" />
        </div>
      )}
      {type === 'notion' && (
        <div className="absolute bottom-12 right-2 z-10 p-2 font-semibold text-white">
          <svg
            viewBox="0 0 24 24"
            height="20px"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M7 0h16v20H5V0h2zm14 18V2H7v16h14zM9 4h10v2H9V4zm10 4H9v2h10V8zM9 12h7v2H9v-2zm10 10H3V4H1v20h18v-2z"
                fill="#fffff"
              ></path>
            </g>
          </svg>
        </div>
      )}
      {type !== 'video' && (
        <div className="relative">
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
        <div className="relative h-full w-full">
          <VideoThumbnail
            title={title}
            contentId={contentId ?? 0}
            imageUrl=""
          />
        </div>
      )}
      <div className="flex items-center justify-between gap-4">
        <h3 className="w-full truncate text-xl font-medium capitalize tracking-tight md:text-2xl">
          {title}
        </h3>
        {bookmark !== undefined && contentId && (
          <BookmarkButton
            bookmark={bookmark}
            contentId={contentId}
            size={24}
            align="end"
            side="top"
          />
        )}
      </div>
    </motion.div>
  );
};
