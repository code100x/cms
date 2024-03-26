import { Bookmark } from '@prisma/client';
import { useParams } from 'next/navigation';
import { MouseEvent, useState } from 'react';
import { useAction } from './useAction';
import { createBookmark, deleteBookmark } from '@/actions/bookmark';
import { toast } from 'sonner';
import Link from 'next/link';

export const useBookmark = (bookmark: Bookmark | null, contentId: number) => {
  const params = useParams();
  const courseId = params.courseId[0];
  const [addedBookmark, setAddedBookmark] = useState<Bookmark | null>(bookmark);
  const [isDisabled, setIsDisabled] = useState(false);
  const { execute: executeCreateBookmark } = useAction(createBookmark, {
    onSuccess: (data: Bookmark) => {
      toast(
        <div className="flex items-center gap-2">
          <span>Bookmark Added!</span>
          <Link
            className="text-[#040fff]"
            href={`/courses/${courseId}/bookmarks`}
            onClick={() => {
              toast.dismiss();
            }}
          >
            Checkout all bookmarks
          </Link>
        </div>,
        { duration: 3000 },
      );
      setAddedBookmark(data);
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const { execute: executeDeleteBookmark } = useAction(deleteBookmark, {
    onSuccess: () => {
      toast(
        <div className="flex items-center gap-2">
          <span>Bookmark Removed!</span>
        </div>,
        { duration: 3000 },
      );
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleBookmark = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      setIsDisabled(true);
      if (addedBookmark) {
        await executeDeleteBookmark({
          id: addedBookmark.id,
          courseId: parseInt(courseId, 10),
        });
        setAddedBookmark(null);
      } else {
        await executeCreateBookmark({
          contentId,
          courseId: parseInt(courseId, 10),
        });
      }
    } catch (err) {
      toast('Something went wrong');
    } finally {
      setIsDisabled(false);
    }
  };

  return { addedBookmark, handleBookmark, isDisabled };
};
