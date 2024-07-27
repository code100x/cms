import { QueryParams } from '@/actions/types';
import { CourseView } from '@/components/CourseView';
import { getCourse, getFullCourseContent } from '@/db/course';
import findContentById from '@/lib/find-content-by-id';

export default async function Course({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams: QueryParams;
}) {
  const courseId = params.courseId;
  const course = await getCourse(parseInt(courseId, 10));
  const fullCourseContent = await getFullCourseContent(parseInt(courseId, 10));

  const courseContent = findContentById(fullCourseContent, []);
  const contentType =
    courseContent?.length === 1 ? courseContent[0]?.type : 'folder';
  const nextContent = null;

  return (
    <CourseView
      rest={[]}
      course={course}
      contentType={contentType}
      nextContent={nextContent}
      courseContent={courseContent}
      fullCourseContent={fullCourseContent}
      searchParams={searchParams}
      possiblePath=""
    />
  );
}
