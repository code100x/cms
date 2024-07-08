import React from 'react';

const PercentageComplete = ({ percent }: { percent: number }) => {
  return (
    <div
      className={`m-1 ${percent === 100 ? 'bg-green-400' : 'bg-white'} absolute right-2 top-2 z-10 rounded-full border-2 border-[#1D4ED8] px-2 py-1 text-xs font-bold text-[#1D4ED8]`}
    >
      <div>{`${percent}% completed`}</div>
    </div>
  );
};

export default PercentageComplete;
