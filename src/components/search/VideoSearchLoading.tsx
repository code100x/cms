import React from 'react';

const VideoSearchLoading = () => {
  return (
    <div className="flex animate-pulse flex-col gap-4 py-2">
      {[1, 2, 3].map((value) => (
        <div className="flex items-center gap-3 px-3" key={value}>
          <div className="min-w-content rounded bg-slate-50 dark:bg-slate-900">
            <div className="h-4 w-4" />
          </div>
          <span className="h-6 w-full rounded bg-slate-50 dark:bg-slate-900"></span>
        </div>
      ))}
    </div>
  );
};

export default VideoSearchLoading;
