import { TSearchedVideos } from '@/app/api/search/route';
import { Play } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const VideoSearchCard = ({ video }: { video: TSearchedVideos }) => {
  const { id: videoId, parentId, parent } = video;
  if (parentId && parent?.courses.length) {
    const courseId = parent.courses[0].courseId;
    const videoUrl = `/courses/${courseId}/${parentId}/${videoId}`;
    return (
      <Link
        href={videoUrl}
        className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-blue-600/10 hover:text-blue-600"
      >
        <Play className="size-4" />
        <span className="w-4/5 truncate font-medium capitalize">
          {video.title}
        </span>
      </Link>
    );
  }
};

export default VideoSearchCard;
