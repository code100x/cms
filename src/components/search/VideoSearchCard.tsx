import { TSearchedVideos } from '@/app/api/search/route';
import { Play } from 'lucide-react';
import React from 'react';

const VideoSearchCard = ({
  video,
  onCardClick,
}: {
  video: TSearchedVideos;
  onCardClick: (videoUrl: string) => void;
}) => {
  const { id: videoId, parentId, parent } = video;

  if (parentId && parent) {
    const courseId = parent.courses[0].courseId;
    const videoUrl = `/courses/${courseId}/${parentId}/${videoId}`;
    return (
      <div
        className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-blue-600/10 hover:text-blue-600"
        onClick={() => onCardClick(videoUrl)}
      >
        <Play className="size-4" />
        <span className="w-4/5 truncate font-medium capitalize">
          {video.title}
        </span>
      </div>
    );
  }
};

export default VideoSearchCard;
