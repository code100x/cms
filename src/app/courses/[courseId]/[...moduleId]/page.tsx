import { QueryParams } from '@/actions/types';
import { CourseView } from '@/components/CourseView';
import { getCourse, getCourseAllVideos, getFullCourseContent } from '@/db/course';
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

  const CurrentCourseAllVideos = await getCourseAllVideos(Number(courseId));
  const nextContent = CurrentCourseAllVideos.find((video: any) => {
    return video.id > Number(rest[rest.length - 1]);
  });
  const prevContent = (() => {
    for (let i = CurrentCourseAllVideos.length - 1; i >= 0; i--) {
      if (CurrentCourseAllVideos[i].id < Number(rest[rest.length - 1])) {
        return CurrentCourseAllVideos[i];
      }
    }
    return null;
  })();

  const nextContentUrl = (nextContent ? `/courses/${courseId}/${nextContent.parentId}/${nextContent.id}` : null);
  const prevContentUrl = (prevContent ? `/courses/${courseId}/${prevContent.parentId}/${prevContent.id}` : null);

  return (
    <CourseView
      rest={rest}
      course={course}
      nextContent={nextContentUrl}
      prevContent={prevContentUrl}
      courseContent={courseContent}
      fullCourseContent={fullCourseContent}
      searchParams={searchParams}
      possiblePath={possiblePath}
    />
  );
}
