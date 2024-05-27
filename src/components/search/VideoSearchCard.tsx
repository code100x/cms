import { PlayCircleIcon } from 'lucide-react';
import React from 'react';

const VideoSearchCard = ({
  videoId,
  parentId,
  courseId,
  videoTitle,
  onCardClick,
}: {
  videoId: number;
  parentId: number;
  courseId: number;
  videoTitle: string;
  onCardClick: (videoUrl: string) => void;
}) => {
  const videoUrl = `/courses/${courseId}/${parentId}/${videoId}`;
  return (
    <div
      className="px-3 py-2 hover:bg-gray-200 hover:dark:bg-gray-700 cursor-pointer flex items-center gap-3"
      onClick={() => onCardClick(videoUrl)}
    >
      <div className="min-w-content">
        <PlayCircleIcon className="w-4 h-4" />
      </div>
      {/* // NOTE: Ideally course name should be showed instead of course Id(?) */}
      <span className="w-4/5">
        Course: {courseId} - {videoTitle}
      </span>
    </div>
  );
};

export default VideoSearchCard;
