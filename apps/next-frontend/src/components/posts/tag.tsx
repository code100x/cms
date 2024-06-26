'use client';
import useColorGenerator from '@/hooks/useColorGenerator';
import { cn } from '@repo/common/lib/utils';
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
      'px-4  rounded-xl py-1 text-[12px] cursor-pointer mr-1',
      className,
    );

    return (
      <span
        ref={ref}
        className={tagClassName}
        {...props}
        style={{ backgroundColor, color: textColor }}
      >
        {name}
      </span>
    );
  },
);

Tag.displayName = 'Tag';

export default Tag;
