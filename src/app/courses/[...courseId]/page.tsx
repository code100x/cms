import React from 'react';
import { Course } from '@/store/atoms';
import {
  Content,
  Folder,
  Video,
  getCourse,
  getFullCourseContent,
} from '@/db/course';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getPurchases } from '@/utiles/appx';
import { redirect } from 'next/navigation';
import { CourseView } from '@/components/CourseView';
import { QueryParams } from '@/actions/types';

const checkAccess = async (courseId: string) => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return false;
  }
  const purchases = await getPurchases(session.user.email);
  if (purchases.map((p) => p.id).includes(Number(courseId))) {
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
      return foundContent.children;
    }

    return [foundContent];
  }
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
  const courseContent = findContentById(
    fullCourseContent,
    rest.map((x) => parseInt(x, 10)),
  );
  const contentType =
    courseContent?.length === 1 ? courseContent[0]?.type : 'folder';
  const nextContent = null; //await getNextVideo(Number(rest[rest.length - 1]))

  if (!hasAccess) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="justify-between mx-auto text-white">
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
    </div>
  );
}
