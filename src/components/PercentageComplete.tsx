import React from 'react';

const PercentageComplete = ({ percent }: { percent: number }) => {
  return (
    <div>
      <h4 className="mb-1 text-green-700">{percent}% Completed</h4>
      <div className="h-[10px] w-auto rounded-full bg-green-400/20">
        <div
          style={{
            width: `${percent}%`,
            height: '100%',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgb(21 182 61 / 0.6)',
            fontWeight: 'bold',
          }}
        />
      </div>
    </div>
  );
};

export default PercentageComplete;
