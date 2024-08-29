import BookmarkList from './BookmarkList';
import { TBookmarkWithContent } from '@/actions/bookmark/types';

const BookmarkView = ({
  bookmarkData,
}: {
  bookmarkData: TBookmarkWithContent[] | null | { error: string };
}) => {
  return (
    <div className="flex min-h-screen">
      <div className="no-scrollbar grow overflow-y-auto p-2">
        {bookmarkData === null ||
        'error' in bookmarkData ||
        !bookmarkData.length ? (
          <span className="my-auto flex items-center justify-center">
            No bookmark added yet!
          </span>
        ) : (
          <BookmarkList bookmarkData={bookmarkData} />
        )}
      </div>
    </div>
  );
};

export default BookmarkView;
