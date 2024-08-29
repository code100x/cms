import React from 'react';
import { Badge } from './ui/badge';
import { formatTime } from '@/lib/utils';
import clsx from 'clsx';
import bgImage from '../../public/Content-Cover.png';

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
    <div
      className="h-[10rem] bg-cover bg-center bg-no-repeat md:h-[10rem]"
      // style={{ backgroundImage: "url('/Content-Cover.png')" }}
    >
      <img
        src={bgImage.src}
        alt="background"
        className="absolute h-full w-full rounded-t-md"
      />
      <div className="relative m-0 flex h-full flex-col items-center justify-center space-x-0 space-y-0 p-0">
        <p className="sm:text-md flex-wrap whitespace-normal text-wrap border-black text-center text-xs capitalize text-white sm:text-lg">
          {secondPart}
          {/* Displaying the second part of the title */}
        </p>
        {!secondPart && (
          <p className="sm:text-md flex-wrap whitespace-normal text-wrap border-black text-center text-xs capitalize text-white sm:text-lg">
            {title} {/* Displaying the second part of the title */}
          </p>
        )}
        <Badge variant={'ghost'} className="rounded-md px-1 py-0 text-xs">
          100xdevs
        </Badge>
        {type === 'video' && (
          <Badge
            variant={'ghost'}
            className={clsx(
              'absolute bottom-2 right-2 rounded-md p-1 text-xs',
              {
                hidden: false,
              },
            )}
          >
            {formatTime(contentDuration)}
          </Badge>
        )}
      </div>
      {/* <Badge
        variant={'ghost'}
        className={clsx('absolute bottom-2 right-4 rounded-md p-1 text-xs')}
      >
        {contentDuration}
      </Badge> */}
    </div>
  );
};

export default CardComponent;
