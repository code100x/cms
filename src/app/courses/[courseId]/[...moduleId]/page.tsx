import { QueryParams } from '@/actions/types';
import { CourseView } from '@/components/CourseView';
import { Folder, getCourse, getFullCourseContent } from '@/db/course';
import findContentById from '@/lib/find-content-by-id';

export default async function Course({
  params,
  searchParams,
}: {
  params: { moduleId: string[]; courseId: string };
  searchParams: QueryParams;
}) {
  const courseId = params.courseId;
  const rest = params.moduleId;
  const possiblePath = `${params.courseId}/${params.moduleId.join('/')}`;
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

  return (
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
  );
}
