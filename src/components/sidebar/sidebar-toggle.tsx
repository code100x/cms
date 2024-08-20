import { ChevronLeft } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  setIsOpen?: () => void;
}

export const SidebarToggle = ({ isOpen, setIsOpen }: SidebarToggleProps) => {
  return (
    <div className="invisible absolute -right-[16px] top-[12px] z-20 lg:visible">
      <Button
        onClick={() => setIsOpen?.()}
        className="h-8 w-8 rounded-md"
        size="icon"
      >
        <ChevronLeft
          className={cn(
            'h-4 w-4 transition-transform duration-700 ease-in-out',
            isOpen === false ? 'rotate-180' : 'rotate-0',
          )}
        />
      </Button>
    </div>
  );
};
