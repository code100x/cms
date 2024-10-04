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

  // Handle error state
  if ('error' in bookmarkData) {
    return (
      <h1 className="p-4 text-red-500">
        Something went wrong, please try again later.
      </h1>
    );
  }

  // Handle case where there are no bookmarks
  if (bookmarkData.length === 0) {
    return (
      <h2 className="p-4">No bookmarks available. Start adding some!</h2>
    );
  }

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {bookmarkData.map((bookmark) => {
        const {
          contentId,
          content: { type, parent, title, hidden, thumbnail },
        } = bookmark;

        // Only render bookmarks that are videos and not hidden
        if (type === 'video' && parent && !hidden) {
          const { id: folderId, courses } = parent;
          const courseId = courses[0].courseId; // Assuming at least one course exists
          const videoUrl = `/courses/${courseId}/${folderId}/${contentId}`;

          return (
            <ContentCard
              type={type}
              key={contentId} // Ensure each item has a unique key
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

        // Return null if the bookmark does not meet the criteria
        return null; 
      })}
    </section>
  );
};

export default BookmarkList;
