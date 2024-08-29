import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex w-full rounded-lg bg-primary/5 px-3 py-2 text-primary placeholder-primary/80 outline-none transition-all focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:focus:border-blue-500 dark:focus:ring-blue-500',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
