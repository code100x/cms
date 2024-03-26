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
      <div className="max-w-screen-xl justify-between mx-auto p-4 cursor-pointer grid grid-cols-1 gap-5 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
        {bookmarkData.map((bookmark) => {
          const {
            id,
            courseId,
            content: { type, parent, title, id: videoId, hidden, thumbnail },
          } = bookmark;
          if (type === 'video' && parent && !hidden) {
            return (
              <ContentCard
                type={type}
                key={id}
                title={title}
                image={thumbnail || ''}
                onClick={() => {
                  router.push(`/courses/${courseId}/${parent.id}/${videoId}`);
                }}
                bookmark={bookmark}
                contentId={id}
              />
            );
          }
        })}
      </div>
    </>
  );
};

export default BookmarkList;
