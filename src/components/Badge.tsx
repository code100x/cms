const Badge = ({ title }: { title: string }) => {
  return (
    <div className="w-max rounded-full bg-[#3259E8] px-3 py-1 text-xs text-white">
      {title}
    </div>
  );
};

export default Badge;
