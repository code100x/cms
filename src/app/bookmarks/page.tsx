import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Content, CourseContent, VideoProgress } from '@prisma/client';
import { TBookmarkWithContent } from '@/actions/bookmark/types';
import BookmarkView from '@/components/bookmark/BookmarkView';

export type TWatchHistory = VideoProgress & {
  content: Content & {
    parent: { id: number; courses: CourseContent[] } | null;
    VideoMetadata: { duration: number | null } | null;
  };
};

const getBookmarkData = async (): Promise<
  TBookmarkWithContent[] | { error: string }
> => {
  const session = await getServerSession(authOptions);
  const userId = session.user.id;

  return await db.bookmark.findMany({
    where: {
      userId,
    },
    include: {
      content: {
        include: {
          parent: {
            select: {
              id: true,
              courses: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export default async function CoursesComponent() {
  const bookmarkData = await getBookmarkData();

  return <BookmarkView bookmarkData={bookmarkData} />;
}
