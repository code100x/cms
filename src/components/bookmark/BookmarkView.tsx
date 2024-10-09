import BookmarkList from './BookmarkList';
import { TBookmarkWithContent } from '@/actions/bookmark/types';
import NoBookmark from './NoBookmark';

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
        <NoBookmark />
      ) : (
        <BookmarkList bookmarkData={bookmarkData} />
      )}
    </>
  );
};

export default BookmarkView;
