const PercentageComplete = ({ percent }: { percent: number }) => {
  return (
    <div
      className={`${percent === 100 ? 'text-green-500' : 'text-red-500'} w-full text-sm flex items-center justify-center py-1 px-2 rounded-full font-semibold`}
    >
      <div className="w-full">{`${percent}% completed`}</div>
    </div>
  );
};

export default PercentageComplete;
