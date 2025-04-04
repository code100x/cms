import { QueryParams } from '@/actions/types';
import { CourseView } from '@/components/CourseView';
import { getCourse, getFullCourseContent, getNextVideo, getPrevVideo } from '@/db/course';
import findContentById from '@/lib/find-content-by-id';
// import { redirect } from 'next/navigation';

// import resetDb from '../../../../tests/helpers/reset-db';

// async function resetDatabase() {
//   // Reset the database before running the test
//   console.log('Resetting database...');
//   await resetDb();

// }

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
  console.log(fullCourseContent, 'fullCourseContent');
  const courseContent = findContentById(
    fullCourseContent,
    rest.map((x) => parseInt(x, 10)),
  );

  console.log(rest, 'rest');
  console.log(rest.length);
  const nextContent = await getNextVideo(Number(rest[rest.length - 1]));
  const prevContent= await getPrevVideo(Number(rest[rest.length - 1]));
  console.log(courseId, 'courseId');

  return (
    <CourseView
      rest={rest}
      course={course}
      nextContent={nextContent}
      prevContent={prevContent}
      courseContent={courseContent}
      fullCourseContent={fullCourseContent}
      searchParams={searchParams}
      possiblePath={possiblePath}
    />
  );
}
