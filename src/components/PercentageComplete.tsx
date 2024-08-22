import React from 'react';

const PercentageComplete = ({ percent }: { percent: number }) => {
  return (
    <div className="flex flex-col">
      <h4 className="self-end text-sm font-medium text-[#94A3B8]">
        {percent}%
      </h4>
      <div className="mt-2 h-[8px] w-auto rounded-full bg-[#22C55E1A]">
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#3D9C5C',
            fontWeight: 'bold',
          }}
        />
      </div>
    </div>
  );
};

export default PercentageComplete;
