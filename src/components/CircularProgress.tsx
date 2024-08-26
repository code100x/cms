import React from 'react';

interface CircularProgressProps {
  percent: number;
  strokeWidth?: number;
  radius?: number;
  color?: string;
  trailColor?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percent,
  strokeWidth = 8,
  radius = 50,
  color = '#3D9C5C',
}) => {
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative size-14">
        <svg
          stroke={color}
          className="size-full -rotate-90"
          viewBox={`0 0 ${radius * 2} ${radius * 2}`}
          width={radius * 2}
          height={radius * 2}
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            className="stroke-current text-gray-200 dark:text-neutral-700"
            stroke-width={strokeWidth}
          ></circle>
          <circle
            cx={radius}
            cy={radius}
            r={normalizedRadius}
            fill="none"
            className="stroke-current text-green-600 dark:text-green-500"
            stroke-width={strokeWidth}
            stroke-dasharray={circumference}
            stroke-dashoffset={strokeDashoffset}
            stroke-linecap="round"
          ></circle>
        </svg>
        <div className="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <span className="text-black-600 dark:text-white-500 text-center text-xs">
            {percent}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgress;
