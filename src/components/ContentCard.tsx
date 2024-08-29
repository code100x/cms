import { CheckCircle2, Play } from 'lucide-react';
import { Bookmark } from '@prisma/client';
import BookmarkButton from './bookmark/BookmarkButton';
import { formatTime } from '@/lib/utils';
import VideoThumbnail from './videothumbnail';
import CardComponent from './CardComponent';

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
  uploadDate?: string;
}) => {
  // let image ;
  // image = ""
  return (
    <div
      onClick={onClick}
      // className={`relative cursor-pointer rounded-2xl border border-gray-700/50 duration-200 ease-in group${hoverExpand ? ' ' : ''} `}
      className={`relative flex w-full max-w-md cursor-pointer flex-col gap-3 rounded-2xl transition-all duration-300 hover:-translate-y-2 group${hoverExpand ? ' ' : ''} `}
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
      <div className="flex items-center justify-between gap-4 px-2">
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
    </div>
  );
};
