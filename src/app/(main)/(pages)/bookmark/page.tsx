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
    <main className="no-scrollbar flex max-h-[calc(100dvh-10rem)] flex-col gap-4 overflow-y-scroll pb-24 lg:pb-4">
      <div className="flex flex-col gap-4 rounded-2xl">
        <BookmarkView bookmarkData={bookmarkData} />
      </div>
    </main>
  );
}
