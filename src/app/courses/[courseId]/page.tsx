import { QueryParams } from '@/actions/types';
import { CourseView } from '@/components/CourseView';
import {
  Folder,
  getAllCourses,
  getCourse,
  getFullCourseContent,
} from '@/db/course';
import findContentById from '@/lib/find-content-by-id';

export const dynamic = 'auto';

export async function generateStaticParams() {
  const courses = await getAllCourses();
  const courseIds = courses.map((i: any) => {
    return { courseId: `${i.id}` };
  });
  return courseIds.flat();
}

export default async function Course({
  params,
  searchParams,
}: {
  params: { courseId: string };
  searchParams: QueryParams;
}) {
  const courseId = params.courseId;
  const course = await getCourse(parseInt(courseId, 10));
  const fullCourseContent: Folder[] = await getFullCourseContent(
    parseInt(courseId, 10),
  );

  const courseContent = findContentById(fullCourseContent, []);
  const contentType =
    courseContent?.length === 1 ? courseContent[0]?.type : 'folder';
  const nextContent = null; //await getNextVideo(Number(rest[rest.length - 1]))

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
