'use client';
import Link from 'next/link';

import { BookmarkIcon, PlayCircleIcon } from 'lucide-react';
import { formatTime } from '@/lib/utils';
import BookmarkCardDropdown from './BookmarkCardDropdown';
import { Fragment, useState } from 'react';
import { TBookmarkWithContent } from '@/actions/bookmark/types';
import EditBookmarkModal from './EditBookmarkModal';

interface IEditBookmarkProps {
  timestamp: number;
  desc: string;
  id: number;
}

const BookmarkList = ({
  bookmarkData,
}: {
  bookmarkData: TBookmarkWithContent[] | { error: string };
}) => {
  const [editBookMarkProps, setEditBookmarkProps] =
    useState<IEditBookmarkProps | null>(null);
  if ('error' in bookmarkData) {
    return (
      <h1 className="p-4">Something went wrong, please try again later</h1>
    );
  }
  return (
    <>
      <div className="max-w-screen-xl justify-between mx-auto p-4 cursor-pointer grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
        {bookmarkData.map(
          ({
            id,
            courseId,
            timestamp,
            description,
            content: { type, parent, title: videoTitle, id: videoId, hidden },
          }) => {
            if (type === 'video' && parent && !hidden) {
              const url = `/courses/${courseId}/${parent.id}/${videoId}?timestamp=${timestamp}`;
              return (
                <Fragment key={id}>
                  {editBookMarkProps !== null && (
                    <EditBookmarkModal
                      onClose={() => setEditBookmarkProps(null)}
                      open={!!editBookMarkProps}
                      {...editBookMarkProps}
                    />
                  )}
                  <Link
                    href={url}
                    title={`Go to ${description}`}
                    className="cursor-pointer"
                  >
                    <div className="p-5 rounded-md shadow-md flex flex-col gap-3 h-full">
                      <div className="flex items-center w-full justify-between">
                        <BookmarkIcon />
                        <BookmarkCardDropdown
                          onOpenEditModal={() => {
                            setEditBookmarkProps({
                              timestamp,
                              desc: description,
                              id,
                            });
                          }}
                          id={id}
                        />
                      </div>

                      <div className="capitalize font-bold text-xl break-all flex-grow">
                        {description}
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <PlayCircleIcon className="min-w-4 min-h-4" size={16} />
                        <span className="capitalize">{videoTitle}</span>
                        <div className="dark:bg-[#263850] dark:text-[#37A4FF] bg-[#ffffff] text-[#040fff] px-1.5 py-0.5 rounded">
                          {formatTime(timestamp)}
                        </div>
                      </div>
                    </div>
                  </Link>
                </Fragment>
              );
            }
          },
        )}
      </div>
    </>
  );
};

export default BookmarkList;
