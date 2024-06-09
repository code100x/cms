import { cn } from '@repo/common/lib/utils';
import React, { forwardRef } from 'react';

const TextSnippet = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props} />
));

TextSnippet.displayName = 'TextSnippet';

export default TextSnippet;
