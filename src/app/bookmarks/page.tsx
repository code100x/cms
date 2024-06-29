import { Content, CourseContent, VideoProgress } from '@prisma/client';
import BookmarkView from '@/components/bookmark/BookmarkView';
import { getBookmarkDataWithContent } from '@/db/bookmark';

export type TWatchHistory = VideoProgress & {
  content: Content & {
    parent: { id: number; courses: CourseContent[] } | null;
    VideoMetadata: { duration: number | null } | null;
  };
};

export default async function CoursesComponent() {
  const bookmarkData = await getBookmarkDataWithContent();

  return <BookmarkView bookmarkData={bookmarkData} />;
}
