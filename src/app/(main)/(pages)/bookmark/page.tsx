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
    <div className="flex h-screen flex-col">
      <h1 className="bg-background/6 top-0 flex items-center p-5 text-3xl backdrop-blur-lg">
        Bookmarks
      </h1>

      <main className="no-scrollbar mb-10 flex h-full flex-col overflow-y-scroll text-lg">
        <BookmarkView bookmarkData={bookmarkData} />
      </main>
    </div>
  );
}
