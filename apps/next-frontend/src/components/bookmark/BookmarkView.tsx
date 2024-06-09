import BookmarkList from './BookmarkList';
import { TBookmarkWithContent } from '@repo/common/zodTypes/bookmark';

const BookmarkView = ({
  bookmarkData,
}: {
  bookmarkData: TBookmarkWithContent[] | null | { error: string };
}) => {
  return (
    <div className="flex h-full">
      <div className="no-scrollbar grow overflow-y-auto p-2">
        {bookmarkData === null ||
          'error' in bookmarkData ||
          !bookmarkData.length ? (
          <div className="mt-64 flex">
            <div className="m-auto">No bookmark added yet!</div>
          </div>
        ) : (
          <BookmarkList bookmarkData={bookmarkData} />
        )}
      </div>
    </div>
  );
};

export default BookmarkView;
