import { BookmarkIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useBookmark } from '@/hooks/useBookmark';
import { Bookmark } from '@prisma/client';
import { Button } from '../ui/button';
type Side = 'top' | 'right' | 'bottom' | 'left';
type Align = 'center' | 'start' | 'end';

const BookmarkButton = ({
  bookmark,
  contentId,
  size = 20,
  side = 'top',
  align = 'center',
}: {
  bookmark: Bookmark | null;
  contentId: number;
  size?: number;
  side?: Side;
  align?: Align;
}) => {
  const { isDisabled, addedBookmark, handleBookmark } = useBookmark(
    bookmark,
    contentId,
  );

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={isDisabled}
            variant="ghost"
            className="text-primary hover:text-primary"
            onClick={handleBookmark}
          >
            <BookmarkIcon
              size={size}
              {...(addedBookmark && { fill: '#2563EB' })}
              className="drop-shadow-2xl"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent sideOffset={16} side={side} align={align}>
          <p>{addedBookmark ? 'Remove bookmark' : 'Bookmark this video'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BookmarkButton;
