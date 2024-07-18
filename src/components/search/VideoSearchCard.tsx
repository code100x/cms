import { TSearchedVideos } from '@/app/api/search/route';
import { PlayCircleIcon } from 'lucide-react';
import React from 'react';

const VideoSearchCard = ({
  video,
  onCardClick,
  isActive,
}: {
  video: TSearchedVideos;
  onCardClick: (videoUrl: string) => void;
  isActive: boolean;
}) => {
  const { id: videoId, parentId, parent, type } = video;

  if (parentId && parent) {
    const courseId = parent.courses[0].courseId;
    const videoUrl = `/courses/${courseId}/${parentId}/${videoId}`;
    return (
      <div
        className={`flex cursor-pointer items-center gap-3 px-3 py-2 hover:bg-gray-200 hover:dark:bg-gray-700 ${isActive ? 'bg-gray-200 dark:bg-gray-700' : null}`}
        onClick={() => onCardClick(videoUrl)}
      >
        <div className="min-w-content">
          {type === 'video' ? (
            <PlayCircleIcon className="h-4 w-4" />
          ) : (
            <NotionIcon />
          )}
        </div>
        <span className="w-4/5">{video.title}</span>
      </div>
    );
  }
};

export default VideoSearchCard;

function NotionIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="h-4 w-4"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
}
