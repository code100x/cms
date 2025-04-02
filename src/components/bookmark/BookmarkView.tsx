import BookmarkList from './BookmarkList';
import { TBookmarkWithContent } from '@/actions/bookmark/types';
import NoBookmark from './NoBookmark';
import { Bookmark } from '@prisma/client';

const BookmarkView = ({
  bookmarkData,
  initialBookmarks
}: {
  bookmarkData: TBookmarkWithContent[] | null | { error: string };
  initialBookmarks: Bookmark[] 
}) => {
  return (
    <>
      {bookmarkData === null ||
      'error' in bookmarkData ||
      !bookmarkData.length ? (
        <NoBookmark />
      ) : (
        <BookmarkList bookmarkData={bookmarkData} initialBookmarks={initialBookmarks}/>
      )}
    </>
  );
};

export default BookmarkView;
