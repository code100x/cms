import db from '@repo/db/client';
import { TBookmarkWithContent } from '@repo/common/types/bookmark';
import { getServerSession } from 'next-auth';
import { authOptions } from '@repo/common/lib/auth';

export const getBookmarkDataWithContent = async (): Promise<
  TBookmarkWithContent[] | { error: string }
> => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

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

export const getBookmarkData = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  return await db.bookmark.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};
