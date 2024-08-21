import { PanelLeftOpen } from 'lucide-react';

import { cn } from '@/lib/utils';

interface SidebarToggleProps {
  isOpen: boolean | undefined;
  onClick: () => void;
}

export function SidebarToggle({ isOpen, onClick }: SidebarToggleProps) {
  return (
    <button className="h-10 w-10" onClick={() => onClick()}>
      <PanelLeftOpen
        className={cn(
          'h-4 w-4 transition-transform duration-700 ease-in-out',
          isOpen === false ? 'rotate-180' : 'rotate-0',
        )}
      />
    </button>
  );
}
