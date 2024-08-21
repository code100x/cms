/* import { CheckCircle2 } from 'lucide-react';
import PercentageComplete from './PercentageComplete'; */
import { Bookmark } from '@prisma/client';
/* import BookmarkButton from './bookmark/BookmarkButton';
import { formatTime } from '@/lib/utils'; */
import VideoThumbnail from './videothumbnail';
import CardComponent from './CardComponent';

export const ContentCard = ({
  title,
  onClick,
  /*  markAsCompleted,
  percentComplete, */
  type,
  videoProgressPercent,
  hoverExpand = true,
  /* bookmark, */
  contentId,
  /*   contentDuration, */
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
      className={`relative cursor-pointer duration-200 ease-in group${hoverExpand ? ' ' : ''} `}
    >
      {/* {markAsCompleted && (
        <div className="absolute right-2 top-2 z-10">
          <CheckCircle2 color="green" size={30} fill="lightgreen" />
        </div>
      )} */}
      {
        type === 'video' /*  && (
        <div className="text-blue-900g absolute bottom-12 right-2 z-10 rounded-2xl   bg-zinc-900 p-1 px-2 font-semibold text-white">
          {contentDuration && formatTime(contentDuration)}
        </div>
      ) */
      }
      {type !== 'video' && (
        <div className="relative overflow-hidden rounded-2xl">
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
        <div className="relative overflow-hidden rounded-2xl">
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

      {/*   {bookmark !== undefined && contentId && (
        <div className="absolute left-2 top-2">
          <BookmarkButton
            bookmark={bookmark}
            contentId={contentId}
            size={28}
            align="start"
            side="bottom"
          />
        </div>
      )} */}
    </div>
  );
};
