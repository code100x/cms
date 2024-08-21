import { CheckCircle2 } from 'lucide-react';
import { Bookmark } from '@prisma/client';
import BookmarkButton from './bookmark/BookmarkButton';
import { formatTime } from '@/lib/utils';
import VideoThumbnail from './videothumbnail';
import CardComponent from './CardComponent';
import CircularProgress from './CircularProgress';

export const ContentCard = ({
  title,
  onClick,
  markAsCompleted,
  type,
  percentComplete,
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
}) => {
  // let image ;
  // image = ""
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer rounded-2xl border border-gray-700/50 duration-200 ease-in group${hoverExpand ? ' ' : ''} `}
    >
      {markAsCompleted && (
        <div className="absolute right-2 top-2 z-10">
          <CheckCircle2 color="green" size={30} fill="lightgreen" />
        </div>
      )}
      {type !== 'video' && (
        <div className="relative overflow-hidden rounded-md">
          <CardComponent
            title={title}
            contentDuration={contentDuration && formatTime(contentDuration)}
            type={type}
          />
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
      <div className="flex items-center justify-between p-4">
        <div className="space-y-2">
          <h3 className="text-bold text-lg tracking-normal">{title}</h3>
          <h4 className="text-bold text-sm tracking-normal text-[#64748B]">
            Posted on: 10 Aug 2024
          </h4>
        </div>
        {type === 'folder' && (
          <CircularProgress percent={percentComplete ?? 0} />
        )}
        {type === 'video' && (
          <CircularProgress percent={videoProgressPercent ?? 0} />
        )}
      </div>
    </div>
  );
};
