const PercentageComplete = ({ percent }: { percent: number }) => {
  return (
    <div className="w-full text-sm flex items-center justify-center text-blue-600 py-1 px-2 rounded-full font-semibold">
      <div className="w-full">{`${percent}% completed`}</div>
    </div>
  );
};

export default PercentageComplete;
