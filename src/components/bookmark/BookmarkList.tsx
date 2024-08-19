'use client';

import { TBookmarkWithContent } from '@/actions/bookmark/types';
import { useRouter } from 'next/navigation';
import { ContentCard } from '../ContentCard';

const BookmarkList = ({
  bookmarkData,
}: {
  bookmarkData: TBookmarkWithContent[] | { error: string };
}) => {
  const router = useRouter();
  if ('error' in bookmarkData) {
    return (
      <h1 className="p-4">Something went wrong, please try again later</h1>
    );
  }
  return (
    <>
      <div className="mx-auto w-full p-4">
        <h1 className="mb-8 text-2xl font-bold">Bookmarks</h1>
        <div className="grid cursor-pointer auto-rows-fr grid-cols-1 gap-5 md:grid-cols-3">
          {bookmarkData.map((bookmark) => {
            const {
              contentId,
              content: { type, parent, title, hidden, thumbnail },
            } = bookmark;
            if (type === 'video' && parent && !hidden) {
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
            }
          })}
        </div>
      </div>
    </>
  );
};

export default BookmarkList;
