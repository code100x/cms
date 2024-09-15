// import bgImage from '../../public/Content-Cover.png';

const CardComponent = ({
  title,
  type,
  contentDuration,
}: {
  title: string;
  type: string;
  contentDuration: any;
}) => {
  // Assuming your title is stored in a variable

  return (
    <div className="-z-[999] flex h-[27vh] w-full items-center overflow-clip rounded-2xl bg-gradient-to-bl from-blue-400 to-blue-800 p-4">
      <div className="relative flex h-full w-full flex-grow flex-col items-center justify-center">
        <span className="w-fit rounded-full bg-neutral-900/20 px-3 py-1.5 text-center text-sm font-semibold capitalize text-neutral-50">
          100xDevs
        </span>
        <p className="line-clamp-2 flex w-[80%] flex-wrap items-center justify-center text-wrap text-center text-lg font-extrabold capitalize tracking-tight text-neutral-50 md:text-xl">
          {title}
        </p>
      </div>
      <div className="absolute bottom-4 right-4 flex items-center justify-center">
        {type === 'video' && contentDuration !== undefined && (
          <div className="rounded-full bg-neutral-900/20 px-3 py-1.5 text-white">
            <p className="text-sm">{contentDuration}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
