import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
}

export function CloseButton({ onClick, className }: CloseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'absolute right-2 top-2 z-10 flex h-8 w-8 items-center justify-center rounded-sm bg-background text-foreground transition-colors hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        className,
      )}
      aria-label="Close"
    >
      <X className="h-6 w-6" />
    </button>
  );
}
