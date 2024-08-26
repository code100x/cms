import React from 'react';
import { Badge } from './ui/badge';
import { formatTime } from '@/lib/utils';
import clsx from 'clsx';

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
      style={{ backgroundImage: "url('/Content-Cover.png')" }}
    >
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
        <Badge
          variant={'ghost'}
          className="absolute bottom-3 right-3 rounded-md px-1 py-0 text-xs"
        >
          100xdevs
        </Badge>
        {type === 'video' && (
          <Badge
            variant={'ghost'}
            className={clsx(
              'absolute bottom-2 right-2 rounded-md py-1 text-xs',
              {
                hidden: contentDuration === undefined || contentDuration === 0,
              },
            )}
          >
            {formatTime(contentDuration)}
          </Badge>
        )}
      </div>
      <div className="absolute bottom-4 right-4 flex items-center justify-center">
        {type === 'video' && contentDuration !== undefined && (
          <div className="rounded-full bg-gray-400/20 px-2 py-1 text-white">
            <p className="text-sm">{contentDuration}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
