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
    <main className="flex flex-col gap-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <h1 className="text-wrap text-3xl font-extrabold capitalize tracking-tighter md:text-4xl">
          Bookmarks
        </h1>
      </div>
      <div className="flex h-full flex-col gap-4 rounded-2xl py-4">
        <BookmarkView bookmarkData={bookmarkData} />
      </div>
    </main>
  );
}
