import BookmarkList from './BookmarkList';
import { TBookmarkWithContent } from '@/actions/bookmark/types';

const BookmarkView = ({
  bookmarkData,
}: {
  bookmarkData: TBookmarkWithContent[] | null | { error: string };
}) => {
  return (
    <>
      {bookmarkData === null ||
      'error' in bookmarkData ||
      !bookmarkData.length ? (
        <div className="mt-64 flex">
          <div className="text-2xl font-bold">No bookmark added yet!</div>
        </div>
      ) : (
        <BookmarkList bookmarkData={bookmarkData} />
      )}
    </>
  );
};

export default BookmarkView;
