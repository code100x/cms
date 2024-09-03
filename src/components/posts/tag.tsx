'use client';
// import useColorGenerator from '@/hooks/useColorGenerator';
import { cn } from '@/lib/utils';
import React, { forwardRef, Ref } from 'react';

interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  name?: string;
}

const Tag = forwardRef(
  (
    { className, name = 'M1000:)', ...props }: TagProps,
    ref: Ref<HTMLSpanElement>,
  ) => {
    // const [backgroundColor, textColor] = useColorGenerator(name);

    const tagClassName = cn(
      'px-4 rounded-md py-1 text-sm cursor-pointer mr-1  bg-gradient-to-bl from-blue-600 to-blue-300 text-black font-semibold max-h-5px flex items-center max-h-8',
      className,
    );

    return (
      <span
        ref={ref}
        className={tagClassName}
        {...props}
        // style={{ backgroundColor, color: textColor }}
      >
        {name}
      </span>
    );
  },
);

Tag.displayName = 'Tag';

export default Tag;
