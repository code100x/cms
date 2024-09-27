import { CheckCircle2, Play } from 'lucide-react';
import { Bookmark } from '@prisma/client';
import BookmarkButton from '../bookmark/BookmarkButton';
import { formatTime } from '@/lib/utils';
import CardComponent from './CardComponent';
import { motion } from 'framer-motion';
import VideoThumbnail from './VideoThumbnail';

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
      className={`group relative flex h-fit w-full max-w-md cursor-pointer flex-col gap-2 rounded-2xl transition-all duration-300 hover:-translate-y-2`}
    >
      {markAsCompleted && (
        <div className="absolute right-2 top-2 z-10">
          <CheckCircle2 color="green" size={30} fill="lightgreen" />
        </div>
      )}
      {type === 'video' && (
        <div className="absolute bottom-12 right-2 z-10 rounded-md p-2 font-semibold text-white">
          <Play className="size-6" />
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
        <div className="relative overflow-hidden">
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
      <div className="flex items-center justify-between gap-4">
        <h3 className="w-full truncate text-xl font-bold capitalize tracking-tighter md:text-2xl">
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
