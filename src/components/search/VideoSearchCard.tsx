import { TSearchedVideos } from '@/app/api/search/route';
import { Play } from 'lucide-react';
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
        className={`flex w-full cursor-pointer items-center gap-3 rounded-md px-3 py-2 ${watchLater ? '' : 'hover:bg-blue-600/10 hover:text-blue-600'}`}
        onClick={() => onCardClick(videoUrl)}
      >
        {!watchLater && <Play className="size-4" />}
        <span className="w-4/5 truncate font-medium capitalize">
          {video.title}
        </span>
      </div>
    );
  }
};

export default VideoSearchCard;
