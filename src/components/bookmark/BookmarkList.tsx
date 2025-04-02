'use client';

import { TBookmarkWithContent } from '@/actions/bookmark/types';
import { useRouter } from 'next/navigation';
import { ContentCard } from '../ContentCard';
import { useEffect } from 'react';
import { bookmarksState } from '@/store/atoms/bookmark';
import { useSetRecoilState } from 'recoil';
import { Bookmark } from '@prisma/client';

const BookmarkList = ({
  bookmarkData,
  initialBookmarks
}: {
  bookmarkData: TBookmarkWithContent[] | { error: string };
  initialBookmarks: Bookmark[]
}) => {
  const setBookmarks = useSetRecoilState(bookmarksState);
  useEffect(() => {
    setBookmarks(initialBookmarks); 
  }, [initialBookmarks, setBookmarks]);
  const router = useRouter();
  if ('error' in bookmarkData) {
    return (
      <h1 className="p-4">Something went wrong, please try again later</h1>
    );
  }
  return (
    <>
      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bookmarkData.map((bookmark) => {
          const {
            contentId,
            content: { type, parent, title, hidden, thumbnail, courses },
          } = bookmark;
          if ((type === 'video' || type === 'notion') && parent && !hidden) {
            const { id: folderId, courses } = parent;
            const courseId = courses[0].courseId;
            const videoUrl = `/courses/${courseId}/${folderId}/${contentId}`;

            return (
              <ContentCard
                type={type}
                key={contentId}
                title={title}
                image={thumbnail || ''}
                onClick={() => {
                  router.push(videoUrl);
                }}
                bookmark={bookmark}
                contentId={contentId}
              />
            );
          } else if (type === 'folder' && !parent) {
            const videoUrl = `/courses/${courses[0].courseId}/${courses[0].contentId}`;

            return (
              <ContentCard
                type={type}
                key={contentId}
                title={title}
                image={thumbnail || ''}
                onClick={() => {
                  router.push(videoUrl);
                }}
                bookmark={bookmark}
                contentId={contentId}
              />
            );
          }
        })}
      </section>
    </>
  );
};

export default BookmarkList;
