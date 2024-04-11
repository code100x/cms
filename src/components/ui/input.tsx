import {  Eye, EyeOff, User } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    if (type === 'password') {
      return (
        <div className="relative">
          <input
            type={show ? 'text' : 'password'}
            className={cn(
              'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-8 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            ref={ref}
            {...props}
          />
          <button
            type="button"
            className="absolute right-2 top-2"
            onClick={() => setShow(!show)}
          >
            {!show ? (
              <EyeOff
                size={20}
                className="dark:text-white text-dark"
                strokeWidth={1.75}
              />
            ) : (
              <Eye
                size={20}
                className="dark:text-white text-dark"
                strokeWidth={1.75}
              />
            )}
          </button>
        </div>
      );
    }
    if (type === 'email' || type === 'text') {
      return (
        <div className="relative">
          <input
            type="text"
            className={cn(
              'flex h-9 w-full rounded-md border border-input bg-transparent px-3 pr-8 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            ref={ref}
            {...props}
          />
          <div className="absolute right-2 top-2">
            {type === 'email' ? (
              <User
                size={20}
                className="dark:text-white text-dark"
                strokeWidth={1.75}
              />
            ) : (
              <User
                size={20}
                className="dark:text-white text-dark"
                strokeWidth={1.75}
              />
            )}
          </div>
        </div>
      );
    }
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
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
