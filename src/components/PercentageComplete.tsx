import React from 'react';

const PercentageComplete = ({ percent }: { percent: number }) => {
  return (
    <div className="flex flex-col">
      <div className="h-1.5 w-auto bg-primary/10">
        <div
          className={`h-full rounded-r-full bg-gradient-to-r from-green-400 to-green-500`}
          style={{
            width: `${percent}%`,
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
          }}
        />
      </div>
    </div>
  );
};

export default PercentageComplete;
