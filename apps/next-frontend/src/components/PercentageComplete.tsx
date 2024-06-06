import React from 'react';

const PercentageComplete = ({ percent }: { percent: number }) => {
  return (
    <div
      className={`m-1 ${percent === 100 ? 'bg-green-400' : 'bg-white'} text-xs absolute top-2 right-2 text-[#1D4ED8] border-[#1D4ED8] border-2 py-1 px-2 rounded-full font-bold z-10`}
    >
      <div>{`${percent}% completed`}</div>
    </div>
  );
};

export default PercentageComplete;
