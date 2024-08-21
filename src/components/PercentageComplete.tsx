import { Progress } from '@radix-ui/react-progress';
import React from 'react';

const PercentageComplete = ({ percent }: { percent: number }) => {
  return (
    <div className="rounded-lg">
      <Progress
        value={percent}
        className="relative h-2 w-full overflow-hidden rounded-lg"
      >
        <div className="absolute h-full w-full bg-green-500 opacity-10" />
        {/* Progress indicator without opacity */}
        <div
          className="absolute h-full rounded-lg bg-green-700"
          style={{ width: `${percent}%` }}
        />
      </Progress>
    </div>
  );
};

export default PercentageComplete;
