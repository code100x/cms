import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const ButtonV2 = ({
  onClick,
  children,
  className,
}: {
  onClick: (e?: any) => void;
  children: ReactNode;
  className?: String;
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        'w-full rounded-full bg-[#3259E8] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus-visible:bg-blue-800 focus-visible:ring-4 focus-visible:ring-blue-300',
        className,
      )}
    >
      {children}
    </button>
  );
};

export default ButtonV2;
