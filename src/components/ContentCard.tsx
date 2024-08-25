import { CheckCircle2 } from 'lucide-react';
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
}) => {
  // let image ;
  // image = ""
  return (
    <div
      onClick={onClick}
      className={`border-muted-background group relative min-w-60 cursor-pointer overflow-hidden rounded-md border duration-200 ease-in hover:bg-secondary ${hoverExpand ? ' ' : ''} `}
    >
      {markAsCompleted && (
        <div className="absolute right-2 top-2 z-10">
          <CheckCircle2 color="green" size={30} fill="lightgreen" />
        </div>
      )}

      {type !== 'video' && (
        <div className="relative overflow-hidden">
          <CardComponent
            title={title}
            contentDuration={contentDuration && formatTime(contentDuration)}
            type={type}
          />
        </div>
      )}
      {type === 'video' && (
        <div className="relative overflow-hidden rounded-t-md">
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
      <div className="flex items-center justify-between gap-2 p-4">
        <div>
          <h3 className="text-bold text-md whitespace-nowrap capitalize tracking-normal">
            {title}
          </h3>
          <h4 className="text-bold whitespace-nowrap text-sm tracking-normal text-muted-foreground">
            Posted on: 10 Aug 2024
          </h4>
        </div>
        {type === 'folder' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-folder-closed fill-secondary text-foreground"
          >
            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
            <path d="M2 10h20" />
          </svg>
        )}
        {type === 'notion' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-book-text fill-secondary text-foreground/80"
          >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
            <path d="M8 11h8" />
            <path d="M8 7h6" />
          </svg>
        )}
        {type === 'video' && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-play fill-secondary text-foreground"
          >
            <circle cx="12" cy="12" r="10" />
            <polygon points="10 8 16 12 10 16 10 8" />
          </svg>
        )}
      </div>
      {!!videoProgressPercent && (
        <div className="absolute bottom-0 h-1 w-full bg-[#707071]">
          <div
            className="h-full bg-red"
            style={{ width: `${videoProgressPercent}%` }}
          />
        </div>
      )}
    </div>
  );
};
