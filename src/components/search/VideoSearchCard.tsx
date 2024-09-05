import { TSearchedVideos } from '@/app/api/search/route';
import { PlayCircleIcon } from 'lucide-react';
import React from 'react';

const VideoSearchCard = ({
  video,
  onCardClick,
  watchLater,
}: {
  video: TSearchedVideos;
  onCardClick: (videoUrl: string) => void;
  watchLater: boolean;
}) => {
  const { id: videoId, parentId, parent } = video;

  if (parentId && parent) {
    const courseId = parent.courses[0]?.courseId;
    const videoUrl = `/courses/${courseId}/${parentId}/${videoId}`;
    return (
      <div
        className={`flex w-full cursor-pointer items-center gap-3 px-3 py-2 ${watchLater ? '' : 'hover:bg-gray-200 hover:dark:bg-gray-700'}`}
        onClick={() => onCardClick(videoUrl)}
      >
        <div className="min-w-content">
          <PlayCircleIcon className="h-4 w-4" />
        </div>
        <span className="w-4/5">{video.title}</span>
      </div>
    );
  }
};

export default VideoSearchCard;
