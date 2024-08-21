import React from 'react';

const CircularProgress = ({ percent }: { percent: number }) => {
  const radius = 35;
  const strokeWidth = 7;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2} className="relative">
        <circle
          stroke="rgb(21 182 61 / 0.2)"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="rgb(21 182 61 / 0.6)"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </svg>
      <div className="absolute font-medium text-black dark:text-white">
        {percent}%
      </div>
    </div>
  );
};

export default CircularProgress;
