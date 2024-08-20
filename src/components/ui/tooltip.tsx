'use client';

import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';

const TooltipProvider = TooltipPrimitive.Provider;
const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, side = 'top', ...props }, ref) => {
  return (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      side={side}
      asChild
      {...props}
    >
      <div className="relative">
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              type: 'spring',
              stiffness: 500,
              damping: 25,
              bounce: 0.4,
            },
          }}
          exit={{ opacity: 0, y: 10, scale: 0.8 }}
          className={cn(
            'z-50 overflow-hidden rounded-md border px-3 py-1.5 text-sm shadow-lg',
            'bg-white text-black dark:bg-gray-800 dark:text-white', // Light and Dark mode compatibility
            'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out',
            'data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
            'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
            'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            className,
          )}
        >
          <motion.span
            className="relative text-base font-bold"
            style={{ textShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)' }}
            whileHover={{
              textShadow: '0px 0px 12px rgba(0, 0, 0, 0.3)',
              transition: { duration: 0.2 },
            }}
          >
            {props.children}
          </motion.span>
          <div className="absolute inset-x-0 bottom-0 h-0.5 animate-pulse bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
        </motion.div>
        {/* Tooltip Arrow */}
        {side === 'top' && (
          <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-b-[10px] border-l-[10px] border-r-[10px] border-t-[10px] border-b-transparent border-l-transparent border-r-transparent border-t-white dark:border-t-gray-800" />
        )}
        {side === 'bottom' && (
          <div className="absolute bottom-full left-1/2 h-0 w-0 -translate-x-1/2 border-b-[10px] border-l-[10px] border-r-[10px] border-t-[10px] border-b-white border-l-transparent border-r-transparent border-t-transparent dark:border-b-gray-800" />
        )}
        {side === 'left' && (
          <div className="absolute left-full top-1/2 h-0 w-0 -translate-y-1/2 border-b-[10px] border-l-[10px] border-r-[10px] border-t-[10px] border-b-transparent border-l-white border-r-transparent border-t-transparent dark:border-l-gray-800" />
        )}
        {side === 'right' && (
          <div className="absolute right-full top-1/2 h-0 w-0 -translate-y-1/2 border-b-[10px] border-l-[10px] border-r-[10px] border-t-[10px] border-b-transparent border-l-transparent border-r-white border-t-transparent dark:border-r-gray-800" />
        )}
      </div>
    </TooltipPrimitive.Content>
  );
});
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
