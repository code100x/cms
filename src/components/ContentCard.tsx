import { CheckCircle2 } from 'lucide-react';
import PercentageComplete from './PercentageComplete';
import { Bookmark } from '@prisma/client';
import BookmarkButton from './bookmark/BookmarkButton';

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
  duration,
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
  duration?: number | null;
}) => {
  let image =
    'https://d2szwvl7yo497w.cloudfront.net/courseThumbnails/folder.png';
  if (type === 'notion') {
    image = 'https://d2szwvl7yo497w.cloudfront.net/courseThumbnails/notes.png';
  } else if (type === 'video') {
    image = 'https://d2szwvl7yo497w.cloudfront.net/courseThumbnails/video.png';
  }
  return (
    <div
      onClick={onClick}
      className={`relative ease-in duration-200 cursor-pointer group${hoverExpand ? ' hover:scale-105' : ''} `}
    >
      {percentComplete !== null && percentComplete !== undefined && (
        <PercentageComplete percent={percentComplete} />
      )}
      {markAsCompleted && (
        <div className="absolute top-2 right-2">
          <CheckCircle2 color="green" size={20} />
        </div>
      )}
      <div className="relative overflow-hidden rounded-md">
        <img src={image} alt={title} className="" />
        <div className="absolute bottom-0 right-0 bg-gray-900 text-white bg-opacity-80 px-1 mr-1 mb-1 rounded-md">
          {duration !== null &&
            duration !== undefined &&
            `${String(Math.floor(duration / 3600)).padStart(2, '0')}:${String(Math.floor((duration % 3600) / 60)).padStart(2, '0')}:${String(Math.floor(duration % 60)).padStart(2, '0')}`}
        </div>
        {!!videoProgressPercent && (
          <div className="absolute bottom-0 w-full h-1 bg-[#707071]">
            <div
              className="h-full bg-[#FF0101]"
              style={{ width: `${videoProgressPercent}%` }}
            />
          </div>
        )}
      </div>
      {bookmark !== undefined && contentId && (
        <div className="absolute top-2 left-2">
          <BookmarkButton
            bookmark={bookmark}
            contentId={contentId}
            size={28}
            align="start"
            side="bottom"
          />
        </div>
      )}
      <div className="flex justify-between mt-2 text-gray-900 dark:text-white">
        <div>{title}</div>
      </div>
    </div>
  );
};
