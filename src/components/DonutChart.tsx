const DonutChart = ({ percentage }: { percentage: number }) => {
  const radius = 23;
  const strokeWidth = 5;
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex items-center justify-center">
      <svg height={radius * 2} width={radius * 2}>
        {/* Background Circle */}
        <circle
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="stroke-green-100 dark:stroke-green-950"
        />
        {/* Progress Circle */}
        <circle
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="origin-center -rotate-90 transform stroke-green-600 dark:stroke-green-400"
        />
        {/* Percentage Text */}
        <text
          x="50%"
          y="50%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="text-xs font-semibold dark:fill-white"
        >
          {percentage}%
        </text>
      </svg>
    </div>
  );
};

export default DonutChart;
