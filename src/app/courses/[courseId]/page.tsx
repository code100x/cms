import { QueryParams } from '@/actions/types';
import { CourseView } from '@/components/course';
import { getCourse, getFullCourseContent } from '@/db/course';
import findContentById from '@/lib/find-content-by-id';
import { Course } from '@prisma/client';

export default async function ServerCoursePage({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams: QueryParams;
}) {
  const courseId = params.courseId;
  const course: Course = await getCourse(parseInt(courseId, 10));
  const fullCourseContent = await getFullCourseContent(parseInt(courseId, 10));

  const courseContent = findContentById(fullCourseContent, []);

  const nextContent = null;

  return await CourseView({
    course,
    rest: [],
    nextContent,
    fullCourseContent,
    courseContent,
    searchParams,
    possiblePath: '',
  });
}
