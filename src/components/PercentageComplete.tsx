import React from 'react';

const PercentageComplete = ({ percent }: { percent: number }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="font-medium text-green-700">{percent}% Completed</span>
      </div>
      <div className="h-[10px] w-auto rounded-full bg-green-400/20">
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            borderRadius: '10px',
            backgroundColor: 'rgb(21 182 61 / 0.6)',
          }}
        />
      </div>
    </div>
  );
};

export default PercentageComplete;
