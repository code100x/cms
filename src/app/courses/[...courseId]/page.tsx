import {
  Folder,
  Video,
  getCourse,
  getFullCourseContent,
  getNextVideo,
} from '@/db/course';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPurchases } from '@/utiles/appx';
import { redirect } from 'next/navigation';
import { CourseView } from '@/components/CourseView';
import { QueryParams } from '@/actions/types';

import { Content } from '@prisma/client';
import { TBookmarkWithContent } from '@/actions/bookmark/types';
import db from '@/db';
import { rateLimit } from '@/lib/utils';
import BookmarkView from '@/components/bookmark/BookmarkView';

interface PurchaseType {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  appxCourseId: number;
  openToEveryone: boolean;
  slug: string;
  discordRoleId: string;
  totalVideos?: number;
  totalVideosWatched: number;
}

const getBookmarkData = async (
  courseId: string,
): Promise<TBookmarkWithContent[] | { error: string }> => {
  const session = await getServerSession(authOptions);
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

const checkAccess = async (courseId: string) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return false;
  }
  const purchases = await getPurchases(session.user.email);
  if (purchases.map((p: PurchaseType) => p.id).includes(Number(courseId))) {
    return true;
  }
  return false;
};

function findContentById(
  contents: (Folder | Video | Content)[],
  ids: number[],
) {
  if (ids.length === 0) return contents;

  const currentId = ids[0];
  const remainingIds = ids.slice(1);

  const foundContent = contents.find((content) => content.id === currentId);

  if (!foundContent) {
    return null;
  } else if (remainingIds.length === 0) {
    if (foundContent.type === 'folder') {
      // TODO: Fix these
      // @ts-ignore
      return foundContent.children;
    }

    return [foundContent];
  }
  // @ts-ignore
  return findContentById(foundContent.children || [], remainingIds);
}

export default async function Course({
  params,
  searchParams,
}: {
  params: { courseId: string[] };
  searchParams: QueryParams;
}) {
  const courseId = params.courseId[0];
  const rest = params.courseId.slice(1);
  const possiblePath = params.courseId.join('/');
  const hasAccess = await checkAccess(courseId);
  const course = await getCourse(parseInt(courseId, 10));
  const fullCourseContent: Folder[] = await getFullCourseContent(
    parseInt(courseId, 10),
  );

  if (!hasAccess) {
    redirect('/api/auth/signin');
  }

  if (params.courseId[1] === 'bookmarks') {
    const bookmarkData = await getBookmarkData(courseId);

    return (
      <BookmarkView
        bookmarkData={bookmarkData}
        courseId={course.id}
        fullCourseContent={fullCourseContent}
      />
    );
  }

  const courseContent = findContentById(
    fullCourseContent,
    rest.map((x) => parseInt(x, 10)),
  );
  const contentType =
    courseContent?.length === 1 ? courseContent[0]?.type : 'folder';
  const nextContent = await getNextVideo(Number(rest[rest.length - 1]));

  return (
    <>
      <CourseView
        rest={rest}
        course={course}
        contentType={contentType}
        nextContent={nextContent}
        courseContent={courseContent}
        fullCourseContent={fullCourseContent}
        searchParams={searchParams}
        possiblePath={possiblePath}
      />
    </>
  );
}
