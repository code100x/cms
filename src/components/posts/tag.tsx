'use client';

import useColorGenerator from '@/hooks/useColorGenerator';
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
    const [backgroundColor, textColor] = useColorGenerator(name);

    const tagClassName = cn(
      'inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-semibold',
      'transition-colors duration-150 ease-in-out',
      'hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50',
      className
    );

    return (
      <span
        ref={ref}
        className={tagClassName}
        {...props}
        style={{ 
          backgroundColor, 
          color: textColor,
        }}
        role="status"
        aria-label={`Tag: ${name}`}
      >
        {name}
      </span>
    );
  },
);

Tag.displayName = 'Tag';

export default Tag;