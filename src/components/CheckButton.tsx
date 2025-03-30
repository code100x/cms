'use client';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Button } from './ui/button';
import { CheckCircle2, Circle } from 'lucide-react';
import { MouseEvent, useCallback, useState } from 'react';
import { handleMarkAsCompleted } from '@/lib/utils';
import { toast } from 'sonner';
type Side = 'top' | 'right' | 'bottom' | 'left';
type Align = 'center' | 'start' | 'end';
interface CheckButtonProp {
  contentId: number;
  size?: number;
  side?: Side;
  align?: Align;
  className?: string;
}
function CheckButton({
  contentId,
  size = 20,
  side = 'top',
  align = 'center',
  className = '',
}: CheckButtonProp) {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const handleCheck = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      const newState = !isCompleted;
      setIsCompleted(newState);
      const data = await handleMarkAsCompleted(newState, contentId);
      if (data) {
        toast(!newState ? 'Mark Uncompleted' : 'Mark Completed', {
          duration: 1000,
        });
      }
    },
    [isCompleted, contentId],
  );
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className={`text-primary hover:text-primary ${className}`}
            onClick={handleCheck}
          >
            {isCompleted ? (
              <CheckCircle2
                size={size}
                color="green"
                fill="lightgreen"
                className="drop-shadow-2xl"
              />
            ) : (
              <Circle size={size} className="drop-shadow-2xl" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={16} side={side} align={align}>
          <p>{isCompleted ? 'Mark Uncompleted' : 'Mark Completed'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default CheckButton;
