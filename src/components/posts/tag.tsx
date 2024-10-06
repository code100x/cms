'use client';
<<<<<<< HEAD

import useColorGenerator from '@/hooks/useColorGenerator';
=======
>>>>>>> cb119cc (border added to light mode question cards)
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
    const tagClassName = cn(
<<<<<<< HEAD
      'inline-flex items-center px-2.5 py-1 rounded-lg text-sm font-semibold',
      'transition-colors duration-150 ease-in-out',
      'hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50',
      className
=======
      'text-s font-medium me-2 px-3 py-0.5 rounded-xl dark:bg-blue-900 dark:text-blue-300 bg-blue-100 text-blue-800',

      className,
>>>>>>> cb119cc (border added to light mode question cards)
    );

    return (
      <span
        ref={ref}
        className={tagClassName}
        {...props}
<<<<<<< HEAD
        style={{ 
          backgroundColor, 
          color: textColor,
        }}
        role="status"
        aria-label={`Tag: ${name}`}
=======
        // style={{ backgroundColor, color: textColor }}
>>>>>>> cb119cc (border added to light mode question cards)
      >
        {name}
      </span>
    );
  },
);

Tag.displayName = 'Tag';

export default Tag;