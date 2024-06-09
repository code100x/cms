import BookmarkList from './BookmarkList';
import { TBookmarkWithContent } from '@repo/common/zodTypes/bookmark';

const BookmarkView = ({
  bookmarkData,
}: {
  bookmarkData: TBookmarkWithContent[] | null | { error: string };
}) => {
  return (
    <div className="flex h-full">
      <div className="grow p-2 overflow-y-auto no-scrollbar">
        {bookmarkData === null ||
          'error' in bookmarkData ||
          !bookmarkData.length ? (
          <div className="flex mt-64">
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
