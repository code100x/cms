import { QueryParams } from '@/actions/types';
import { CourseView } from '@/components/CourseView';
import {
  Folder,
  getContentNested,
  getCourse,
  getFullCourseContent,
} from '@/db/course';
import findContentById from '@/lib/find-content-by-id';

export const dynamic = 'auto';

export async function generateStaticParams() {
  const courses = await getContentNested();
  const courseIds = courses.map((courseId: any) => {
    const getFolder = courseId.content.flatMap((folderId: any) => {
      const getContent = folderId.content.children.map((contentId: any) => {
        return {
          courseId: `${courseId.id}`,
          moduleId: [`${folderId.contentId}`, `${contentId.id}`],
        };
      });
      return [
        ...getContent,
        { courseId: `${courseId.id}`, moduleId: [`${folderId.contentId}`] },
      ];
    });
    return getFolder;
  });
  return courseIds.flat();
}

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
