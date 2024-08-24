import React from 'react';
import { Badge } from './ui/badge';
import clsx from 'clsx';

const PercentageComplete = ({ percent }: { percent: number }) => {
  return (
    <div className="space-y-2">
      <div
        className={clsx('h-[8px] w-auto rounded-full', {
          'bg-green-background': percent === 100,
          'bg-blue-background': percent < 100,
        })}
      >
        <div
          className={clsx('bg-green', {
            'bg-blue': percent < 100,
          })}
          style={{
            width: `${percent}%`,
            height: '100%',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
          }}
        />
      </div>
      <Badge variant={percent < 100 ? 'blue' : 'green'}>
        {percent}% Completed
      </Badge>
    </div>
  );
};

export default PercentageComplete;
