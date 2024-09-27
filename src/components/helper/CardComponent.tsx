import bgImage from '@public/Content-Cover.png';

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

  const [, secondPart] = title.split(' | ');

  return (
    <div className="flex min-h-[24vh] items-center overflow-clip rounded-xl">
      <img
        src={bgImage.src}
        alt="background"
        className="absolute h-full w-full rounded-xl"
      />
      <div className="relative flex h-full flex-grow flex-col items-center justify-center">
        <p className="md:text-md flex-wrap whitespace-normal text-wrap rounded-full border-black bg-gray-400/20 px-3 py-1 text-center text-xs capitalize text-white sm:text-lg lg:text-sm">
          100xDevs
        </p>
        <p className="sm:text-md flex-wrap whitespace-normal text-wrap border-black text-center text-xs capitalize text-white sm:text-lg">
          {secondPart} {/* Displaying the second part of the title */}
        </p>
        {!secondPart && (
          <p className="sm:text-md flex-wrap whitespace-normal text-wrap border-black text-center text-xs capitalize text-white sm:text-lg">
            {title} {/* Displaying the second part of the title */}
          </p>
        )}
      </div>
      <div className="absolute bottom-4 right-4 flex items-center justify-center">
        {type === 'video' && contentDuration !== undefined && (
          <div className="rounded-full bg-gray-400/20 px-2 py-1 text-white">
            <p className="text-sm">{contentDuration}</p>
          </div>
        )}
        {type === 'notion' && (
          <svg
            viewBox="0 0 24 24"
            height="20px"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M7 0h16v20H5V0h2zm14 18V2H7v16h14zM9 4h10v2H9V4zm10 4H9v2h10V8zM9 12h7v2H9v-2zm10 10H3V4H1v20h18v-2z"
                fill="#fffff"
              ></path>
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
