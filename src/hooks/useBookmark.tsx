import { Bookmark } from '@prisma/client';
import { MouseEvent, useEffect, useState } from 'react';
import { useAction } from './useAction';
import { createBookmark, deleteBookmark } from '@/actions/bookmark';
import { toast } from 'sonner';
import Link from 'next/link';
import { bookmarksState } from '@/store/atoms/bookmark';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export const useBookmark = (bookmark: Bookmark | null, contentId: number) => {
  const bookmarks = useRecoilValue(bookmarksState); 
  const setBookmarks = useSetRecoilState(bookmarksState);
  const [isDisabled, setIsDisabled] = useState(false);
  const existingBookmark = bookmarks.find((b) => b.contentId === contentId) || null;
  const { execute: executeCreateBookmark } = useAction(createBookmark, {
    onSuccess: (data: Bookmark) => {
      toast(
        <div className="flex items-center gap-2">
          Bookmark Added!
          <Link
            className="text-[#040fff]"
            href={'/bookmark'}
            onClick={() => {
              toast.dismiss();
            }}
            target="_blank"
          >
            Checkout all bookmarks
          </Link>
        </div>,
        { duration: 3000 },
      );
      setBookmarks( (prev)=>[...prev,data])
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
      setBookmarks((prev) => prev.filter((b: { contentId: number; }) => b.contentId !== contentId)); // Remove from state
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleBookmark = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();

    try {
      setIsDisabled(true);
      if (existingBookmark) {
        await executeDeleteBookmark({
          id: existingBookmark.id,
        });
        setBookmarks((prev) => prev.filter((b: { contentId: number; }) => b.contentId !== contentId)); // Remove from state
      } else {
        await executeCreateBookmark({
          contentId,
        });
      }
    } catch (err) {
      toast('Something went wrong');
    } finally {
      setIsDisabled(false);
    }
    return false;
  };

  return { addedBookmark:existingBookmark, handleBookmark, isDisabled };
};
