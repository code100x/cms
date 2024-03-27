import React from 'react';

const VideoSearchLoading = () => {
  return (
    <div className="animate-pulse flex flex-col gap-4 py-2 ">
      {[1, 2, 3].map((value) => (
        <div className="flex items-center gap-3 px-3 " key={value}>
          <div className="min-w-content bg-slate-50 dark:bg-slate-900 rounded">
            <div className="w-4 h-4" />
          </div>
          <span className="w-full h-6 bg-slate-50 dark:bg-slate-900 rounded"></span>
        </div>
      ))}
    </div>
  );
};

export default VideoSearchLoading;
