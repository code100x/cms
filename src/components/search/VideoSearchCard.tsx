import { TSearchedVideos } from '@/app/api/search/route';
import { Play } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

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
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="w-4/5 truncate font-medium capitalize">
                {video.title}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{video.title}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Link>
    );
  }

  return null;
};

export default VideoSearchCard;
