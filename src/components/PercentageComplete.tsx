import React from 'react';

const PercentageComplete = ({ percent }: { percent: number }) => {
  return (
    <div
      className={`m-1 ${percent === 100 ? 'bg-green-300' : 'bg-white'} text-xs absolute top-2 right-2 text-[#1D4ED8] border-[#1D4ED8] border py-1 px-2 rounded-full font-bold`}
    >
      <div>{`${percent}% completed`}</div>
    </div>
  );
};

export default PercentageComplete;
