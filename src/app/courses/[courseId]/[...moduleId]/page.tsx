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
  console.log(
    `Params is ${  params.courseId  } I am module ${  params.moduleId}`,
  );
  console.log(`SearchParams is ${  searchParams}`);

  const courseId = params.courseId;
  const rest = params.moduleId;
  const possiblePath = params.moduleId.join('/');
  console.log(`Possible path is ${  possiblePath}`);

  const course = await getCourse(parseInt(courseId, 10));
  const fullCourseContent = await getFullCourseContent(parseInt(courseId, 10));

  const courseContent = findContentById(
    fullCourseContent,
    rest.map((x) => parseInt(x, 10)),
  );

  const currentVideoId = rest.length > 0 ? Number(rest[rest.length - 1]) : null;
  console.log(`Current video id is ${  currentVideoId}`);

  const nextContent = currentVideoId
    ? await getNextVideo(currentVideoId)
    : null;
  console.log(
    `Next content is ${ 
      nextContent?.id 
      } type ${ 
      nextContent?.type 
      } title ${ 
      nextContent?.title 
      } parentId ${ 
      nextContent?.parentId}`,
  );

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
