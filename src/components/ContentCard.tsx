// import { CheckCircle2 } from 'lucide-react';
// import PercentageComplete from './PercentageComplete';
import { Bookmark } from '@prisma/client';
import BookmarkButton from './bookmark/BookmarkButton';
import { formatTime } from '@/lib/utils';
import VideoThumbnail from './videothumbnail';
// import CardComponent from './CardComponent';
import CardThumbnail from './CardThumbnail';
import { CircularProgressBar } from './CircularProgressBar';

export const ContentCard = ({
  title,
  onClick,
  markAsCompleted,
  percentComplete,
  type,
  videoProgressPercent,
  hoverExpand = true,
  bookmark,
  contentId,
  contentDuration,
  createdAt,
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
  createdAt?: Date | null;
}) => {
  // let image ;
  // image = ""

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col border rounded-3xl cursor-pointer duration-200 ease-in group${hoverExpand ? ' ' : ''} `}
    >
      {/* {percentComplete !== null && percentComplete !== undefined && (
        <PercentageComplete percent={percentComplete} />
      )} */}

      {/* {markAsCompleted && (
        <div className="absolute right-2 top-2 z-10">
          <CheckCircle2 color="green" size={30} fill="lightgreen" />
        </div>
      )} */}
      {type !== 'video' && (
        <div className="relative overflow-hidden rounded-t-3xl">
          {/* <CardComponent title={title} type={type} /> */}
          <CardThumbnail title={title} type={type} />
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
        <div className="relative flex-1 overflow-hidden rounded-t-3xl">
          <VideoThumbnail
            title={title}
            contentId={contentId ?? 0}
            imageUrl=""
          // imageUrl={
          //   'https://d2szwvl7yo497w.cloudfront.net/courseThumbnails/video.png'
          // }
          />
          <div className="absolute text-sm bottom-2 right-2 z-10 rounded-md bg-[#3359e8] p-1 px-2 font-semibold text-white">
            {contentDuration && formatTime(contentDuration)}
          </div>
        </div>
      )}

      {bookmark !== undefined && contentId && (
        <div className="absolute right-0 py-6 px-2 rounded-r-xl rounded-t-xl  items-center justify-center flex h-fit bg-[#fff] top-0">
          <BookmarkButton
            bookmark={bookmark}
            contentId={contentId}
            size={28}
            align="start"
            side="bottom"
          />
        </div>
      )}
      <div className="h-fit p-4 flex justify-between text-gray-900 dark:text-white">
        <div className='flex gap-2 flex-col'>
          <div className='text-lg'>{title}</div>
          <div className='text-sm text-gray-500'>
            {/* using createAt as of now for folder */}
            {/* (TODO) updatation date for folder must be calculated whenever any new content gets uploaded in that folder/week */}
            {(type === 'folder') ? <p>Last Updated at: {createdAt?.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
            </p>
              : <p>Posted at: {createdAt?.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}</p>
            }
          </div>
        </div>
        <div>
          {(type === 'folder') && <CircularProgressBar percentage={percentComplete || 0} />}
          {(type === 'video') && <CircularProgressBar percentage={videoProgressPercent || 0} />}
        </div>
      </div>
    </div>
  );
};
