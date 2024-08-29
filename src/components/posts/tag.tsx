'use client';
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
      'px-3 text-sm rounded-full py-1 font-medium cursor-pointer bg-blue-500 text-neutral-50 capitalize',
      className,
    );

    return (
      <span ref={ref} className={tagClassName} {...props}>
        {name}
      </span>
    );
  },
);

Tag.displayName = 'Tag';

export default Tag;
