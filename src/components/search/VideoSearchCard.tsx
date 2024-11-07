import { TSearchedVideos } from '@/app/api/search/route';
import { Play } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

interface VideoSearchCardProps {
  video: TSearchedVideos;
  onCardClick?: (videoUrl: string) => void;
}

const VideoSearchCard: React.FC<VideoSearchCardProps> = ({
  video,
  onCardClick,
}) => {
  const { id: videoId, parentId, parent } = video;
  if (parentId && parent?.courses.length) {
    const courseId = parent.courses[0].courseId;
    const videoUrl = `/courses/${courseId}/${parentId}/${videoId}`;

    // Customizable click handler which allows parent components to override default navigation behavior
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (onCardClick) {
        e.preventDefault();
        onCardClick(videoUrl);
      }
    };

    return (
      <Link
        href={videoUrl}
        className="group relative flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-blue-600/10 hover:text-blue-600"
        onClick={handleClick}
      >
        <Play className="size-4" />
        <span
          className="w-4/5 truncate font-medium capitalize"
          data-tooltip={video.title}
        >
          {video.title}
        </span>
        <div className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 transform whitespace-nowrap rounded bg-primary px-2 py-1 text-xs text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {video.title}
        </div>
      </Link>
    );
  }

  return null;
};

export default VideoSearchCard;
