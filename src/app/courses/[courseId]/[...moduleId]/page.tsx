import { QueryParams } from '@/actions/types';
import { CourseView } from '@/components/CourseView';
import { getCourse, getFullCourseContent, getNextVideo } from '@/db/course';
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
  const possiblePath = params.moduleId.join('/');
  const course = await getCourse(parseInt(courseId, 10));
  const fullCourseContent = await getFullCourseContent(parseInt(courseId, 10));

  const courseContent = findContentById(
    fullCourseContent,
    rest.map((x) => parseInt(x, 10)),
  );
  const currentVideoId = rest.length > 0 ? Number(rest[rest.length - 1]) : null;
  const nextContent = currentVideoId
    ? await getNextVideo(currentVideoId)
    : null;

  return (
    <CourseView
      rest={rest}
      course={course}
      nextContent={nextContent}
      courseContent={courseContent}
      fullCourseContent={fullCourseContent}
      searchParams={searchParams}
      possiblePath={possiblePath}
    />
  );
}
