import db from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Content, CourseContent, VideoProgress } from '@prisma/client';
import WatchHistoryClient from '@/components/WatchHistoryClient';
import { Fragment } from 'react';
import { getPurchases } from '@/utiles/appx';

export type TWatchHistory = VideoProgress & {
  content: Content & {
    parent: { id?: number | undefined; courses: CourseContent[] } | null;
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
  const purchases = await getPurchases(session?.user.email || '');
  if (purchases.type === 'error') {
    throw new Error('Ratelimited by appx please try again later');
  }
  const courses = purchases.courses;

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

  const filteruserVideoProgress: TWatchHistory[] = userVideoProgress
    .map((videoProgress) => {
      const filteredCourse = videoProgress?.content?.parent?.courses.filter(
        (course) =>
          courses.some(
            (purchaseCourse) => purchaseCourse.id === course.courseId,
          ),
      );
      if (filteredCourse && filteredCourse.length > 0) {
        return {
          ...videoProgress,
          content: {
            ...videoProgress.content,
            parent: {
              ...videoProgress.content.parent,
              courses: filteredCourse,
            },
          },
        };
      }
    })
    .filter((videoProgress) => videoProgress !== undefined);

  return filteruserVideoProgress;
}

export default async function WatchHistoryPage() {
  const watchHistory = await getWatchHistory();
  const watchHistoryGroupedByDate = groupByWatchedDate(watchHistory);
  return (
    <div className="no-scrollbar max-h-[calc(100dvh-10rem)] overflow-y-scroll">
      <div className="mx-auto my-4 flex w-full flex-col gap-4">
        {Object.entries(watchHistoryGroupedByDate).map(([date, history]) => {
          return (
            <Fragment key={date}>
              <h2 className="text-lg font-medium text-neutral-500 md:text-xl">
                {date}
              </h2>
              <div className="flex h-full flex-col gap-4 rounded-2xl py-4">
                <WatchHistoryClient history={history} />
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
