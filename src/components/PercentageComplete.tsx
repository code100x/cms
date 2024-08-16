import React from 'react';
import { Progress } from './ui/progress';

const PercentageComplete = ({ percent }: { percent: number }) => {
  return (
    <div className="mb-2 flex flex-col gap-2 py-2">
      <p className="text-base text-green-400">{percent}% Completed</p>

      <Progress value={percent} className={`h-2 bg-white dark:bg-gray-600`} />
    </div>
  );
};

export default PercentageComplete;
