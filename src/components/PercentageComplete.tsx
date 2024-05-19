'use client';

import * as React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';
import { cn } from '@/lib/utils';

const PercentageComplete = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, percent, ...props }, ref) => {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        ' h-[22px] absolute !bg-white m-1  overflow-hidden rounded-full bg-primary/20 text-xs top-2 w-[107px] right-2 text-[#1D4ED8] border-[#1D4ED8] border-2   font-bold z-10',
        className,
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="flex-1 w-full h-full transition-all bg-green-400 -z-[10]"
        style={{ transform: `translateX(-${100 - (percent || 0)}%)` }}
      />
      <div className=" absolute left-0 whitespace-nowrap right-0 top-[50%] -translate-y-[50%] z-[999] p-1">
        {percent || 0}% completed
      </div>
    </ProgressPrimitive.Root>
  );
});
PercentageComplete.displayName = ProgressPrimitive.Root.displayName;

export default PercentageComplete;

// const PercentageComplete = ({ percent }: { percent: number }) => {
//   return (
//     <div
//       className={`m-1 ${percent === 100 ? 'bg-green-400' : 'bg-white'} text-xs absolute top-2 right-2 text-[#1D4ED8] border-[#1D4ED8] border-2 py-1 px-2 rounded-full font-bold z-10`}
//     >
//       <div>{`${percent}% completed`}</div>
//     </div>
//   );
// };

// export default PercentageComplete;
