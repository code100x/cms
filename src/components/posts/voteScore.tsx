'use Client';
import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

const VoteScore = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex w-[45px] items-center justify-center ${cn(className)}`}
    {...props}
  />
));

VoteScore.displayName = 'VoteScore'; // Add this line

const VoteBlock = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex h-[45px] w-full items-center justify-center border bg-background ${cn(
      className,
    )}`}
    {...props}
  />
));

VoteBlock.displayName = 'VoteBlock';

export { VoteScore, VoteBlock };
