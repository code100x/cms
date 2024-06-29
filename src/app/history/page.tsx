import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Content, CourseContent, VideoProgress } from '@prisma/client';
import WatchHistoryClient from '@/components/WatchHistoryClient';
import { Fragment } from 'react';

export type TWatchHistory = VideoProgress & {
  content: Content & {
    parent: { id: number; courses: CourseContent[] } | null;
    VideoMetadata: { duration: number | null } | null;
  };
};

const formatWatchHistoryDate = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffInDays = diff / (1000 * 60 * 60 * 24);

  if (diffInDays < 1) {
    return 'Today';
  } else if (diffInDays < 2) {
    return 'Yesterday';
  }
  const currentYear = now.getFullYear();

  const historyYear = date.getFullYear();

  if (currentYear - historyYear > 0) {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const groupByWatchedDate = (userVideoProgress: TWatchHistory[]) => {
  return userVideoProgress.reduce(
    (acc, item) => {
      const date = new Date(item.updatedAt);
      const formattedDate = formatWatchHistoryDate(date);

      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(item);
      return acc;
    },
    {} as { [key: string]: TWatchHistory[] },
  );
};

async function getWatchHistory() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return [];
  }
  const userId = session.user.id;

  const userVideoProgress: TWatchHistory[] = await db.videoProgress.findMany({
    where: {
      userId,
    },
    include: {
      content: {
        include: {
          VideoMetadata: {
            select: {
              duration: true,
            },
          },
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
      updatedAt: 'desc',
    },
  });

  return userVideoProgress;
}

export default async function CoursesComponent() {
  const watchHistory = await getWatchHistory();
  const watchHistoryGroupedByDate = groupByWatchedDate(watchHistory);

  return (
    <div className="px-4 py-5 md:px-20">
      <h1 className="text-2xl font-bold">Watch history</h1>
      <div className="my-4 flex max-w-full flex-col gap-4 sm:my-8">
        {Object.entries(watchHistoryGroupedByDate).map(([date, history]) => {
          return (
            <Fragment key={date}>
              <h2 className="mt-4 text-lg font-semibold sm:mt-0">{date}</h2>
              <WatchHistoryClient history={history} />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
