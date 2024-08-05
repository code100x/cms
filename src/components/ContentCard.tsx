import { CheckCircle2 } from 'lucide-react';
import PercentageComplete from './PercentageComplete';
import { Bookmark } from '@prisma/client';
import BookmarkButton from './bookmark/BookmarkButton';
import { formatTime } from '@/lib/utils';
import VideoThumbnail from './videothumbnail';
import CardComponent from './CardComponent';

export const ContentCard = ({
  title,
  onClick,
  markAsCompleted,
  percentComplete,
  type,
  videoProgressPercent,
  // hoverExpand = true,
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
      className={`mx-auto flex min-h-[35vh] w-full flex-col gap-4 rounded-2xl bg-blue-400/40 p-2 shadow-blue-600/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg dark:bg-blue-950/80 md:max-w-sm`}
    >
      {type !== 'video' && (
        <div className="relative overflow-hidden rounded-xl">
          <CardComponent title={title} type={type} />
          {/* <img src={image} alt={title} className="" /> */}
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
        <div className="relative overflow-hidden rounded-xl">
          {/* <Play className="absolute left-[50%] top-[50%] z-20 translate-y-2 rounded-md bg-blue-600 p-1 text-blue-50 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100" /> */}
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
      <div className="flex flex-col gap-2 px-2 text-foreground">
        <div className="flex items-center justify-between gap-2">
          <h3 className="line-clamp-2 text-wrap text-lg font-bold capitalize tracking-tighter md:text-xl">
            {title}
          </h3>

          {bookmark !== undefined && contentId && (
            <div className="left-2 top-2">
              <BookmarkButton
                bookmark={bookmark}
                contentId={contentId}
                size={28}
                align="start"
                side="bottom"
              />
            </div>
          )}
          {percentComplete !== null && percentComplete !== undefined && (
            <PercentageComplete percent={percentComplete} />
          )}
          {markAsCompleted && (
            <CheckCircle2 color="green" size={32} fill="lightgreen" />
          )}
        </div>
        {type === 'video' && (
          <span className="text-foreground/80">
            {contentDuration && formatTime(contentDuration)}
          </span>
        )}
      </div>
    </div>
  );
};
