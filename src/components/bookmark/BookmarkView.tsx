import { Folder } from '@/db/course';
import BookmarkList from './BookmarkList';
import { TBookmarkWithContent } from '@/actions/bookmark/types';
import { Sidebar } from '../Sidebar';

const BookmarkView = ({
  courseId,
  fullCourseContent,
  bookmarkData,
}: {
  fullCourseContent: Folder[];
  courseId: string;
  bookmarkData: TBookmarkWithContent[] | null | { error: string };
}) => {
  return (
    <div className="flex h-full">
      <Sidebar fullCourseContent={fullCourseContent} courseId={courseId} />
      <div className="grow p-2 overflow-y-auto no-scrollbar">
        {bookmarkData !== null ? (
          <BookmarkList bookmarkData={bookmarkData} />
        ) : null}
      </div>
    </div>
  );
};

export default BookmarkView;
