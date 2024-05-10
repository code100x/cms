import { QueryParams } from '@/actions/types';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

import { TBookmarkWithContent } from '@/actions/bookmark/types';
import BookmarkView from '@/components/bookmark/BookmarkView';
import db from '@/db';
import { rateLimit } from '@/lib/utils';

const getBookmarkData = async (
  courseId: string,
): Promise<TBookmarkWithContent[] | { error: string }> => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return { error: 'Unauthorized' };
  }
  const userId = session.user.id;

  if (!rateLimit(userId)) {
    return { error: 'Rate limit exceeded. Please try again later.' };
  }

  return await db.bookmark.findMany({
    where: {
      userId,
      courseId: parseInt(courseId, 10),
    },
    include: {
      content: {
        include: {
          parent: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export default async function Course({
  params,
}: {
  params: { courseId: string };
  searchParams: QueryParams;
}) {
  const courseId = params.courseId;
  const bookmarkData = await getBookmarkData(courseId);

  return <BookmarkView bookmarkData={bookmarkData} />;
}
