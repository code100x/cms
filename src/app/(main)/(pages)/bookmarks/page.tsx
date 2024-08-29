import { Content, CourseContent, VideoProgress } from '@prisma/client';
import BookmarkView from '@/components/bookmark/BookmarkView';
import { getBookmarkDataWithContent } from '@/db/bookmark';

export type TWatchHistory = VideoProgress & {
  content: Content & {
    parent: { id: number; courses: CourseContent[] } | null;
    VideoMetadata: { duration: number | null } | null;
  };
};

export default async function BookmarksPage() {
  const bookmarkData = await getBookmarkDataWithContent();

  return (
    <div className="flex h-full flex-col gap-4">
      <h1 className="anti text-4xl font-bold capitalize tracking-tighter">
        Bookmarks
      </h1>

      <BookmarkView bookmarkData={bookmarkData} />
    </div>
  );
}
