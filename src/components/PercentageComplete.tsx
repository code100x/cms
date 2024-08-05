import React from 'react';

const PercentageComplete = ({ percent }: { percent: number }) => {
  return (
    <div
      className={`size-14 rounded-full p-1 text-sm font-bold text-foreground`}
      style={{
        background: `conic-gradient(
          #2563eb ${percent * 3.6}deg,
          #2563eb40 ${percent * 3.6}deg
        )`,
        borderRadius: '50%',
      }}
    >
      <span className="flex size-full items-center justify-center rounded-full bg-blue-400/40 dark:bg-blue-950/60">
        {`${percent}%`}
      </span>
    </div>
  );
};

export default PercentageComplete;
