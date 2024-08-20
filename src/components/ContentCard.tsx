import { CheckCircle2, Play } from 'lucide-react';
import { Bookmark } from '@prisma/client';
import BookmarkButton from './bookmark/BookmarkButton';
import { formatTime } from '@/lib/utils';
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
      {
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
      }

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
        <div className="rounded-full border border-[#64748b] p-2">
          <Play size={20} color="#64748b" />
        </div>
      </div>
    </div>
  );
};
