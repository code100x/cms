import { BookmarkIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useBookmark } from '@/hooks/useBookmark';
import { Bookmark } from '@prisma/client';
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
          <button disabled={isDisabled} onClick={handleBookmark}>
            <BookmarkIcon
              size={size}
              {...(addedBookmark && { fill: '#2563EB' })}
            />
          </button>
        </TooltipTrigger>
        <TooltipContent sideOffset={16} side={side} align={align}>
          <p>{addedBookmark ? 'Remove bookmark' : 'Add Bookmark'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default BookmarkButton;
