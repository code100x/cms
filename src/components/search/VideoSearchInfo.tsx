import { InfoIcon } from 'lucide-react';
import React from 'react';

const VideoSearchInfo = ({ text }: { text: string }) => {
  return (
    <div className="flex items-center gap-3 px-3 text-sm text-gray-700 dark:text-gray-500">
      <div className="min-w-content">
        <InfoIcon className="h-4 w-4" />
      </div>
      <span className="w-4/5">{text}</span>
    </div>
  );
};

export default VideoSearchInfo;
