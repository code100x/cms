import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Content, CourseContent, VideoProgress } from '@prisma/client';
import WatchHistoryClient from '@/components/WatchHistoryClient';
import { Fragment } from 'react';
import { redirect } from 'next/navigation';

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

export default async function WatchHistoryPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/signin');
    return null; // Prevent further rendering
  }
  const watchHistory = await getWatchHistory();
  const watchHistoryGroupedByDate = groupByWatchedDate(watchHistory);

  return (
    <div className="flex h-screen flex-col">
      <h1 className="bg-background/6 top-0 flex items-center p-5 text-3xl backdrop-blur-lg">
        Watch History
      </h1>

      <main className="no-scrollbar mb-10 flex h-full flex-col overflow-y-scroll p-5 text-lg">
        {Object.entries(watchHistoryGroupedByDate).map(([date, history]) => {
          return (
            <Fragment key={date}>
              <h2 className="pb-4 text-xl font-semibold text-[#64748B] sm:mt-0">
                {date}
              </h2>
              <WatchHistoryClient history={history} />
            </Fragment>
          );
        })}
      </main>
    </div>
  );
}
