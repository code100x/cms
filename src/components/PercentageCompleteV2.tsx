const PercentageCompleteV2 = ({ percentage }: { percentage: Number }) => {
  const progressBarStyle = {
    width: `${percentage}%`,
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium text-[#00823E]">
        {percentage.toString()}% Completed
      </p>
      <div className="relative h-2 w-full rounded-full bg-[#22C55E1a]">
        <div
          className={`absolute left-0 h-2 rounded-full bg-[#00823E] opacity-100 dark:bg-[#3D9C5C]`}
          style={progressBarStyle}
        />
      </div>
    </div>
  );
};

export default PercentageCompleteV2;
