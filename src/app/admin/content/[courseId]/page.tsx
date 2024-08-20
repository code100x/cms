import { getCourse, getFullCourseContent } from '@/db/course';
import { AddContent } from '@/components/admin/AddContent';
import { AdminCourseContent } from '@/components/admin/CourseContent';
import findContentById from '@/lib/find-content-by-id';

export default async function UpdateCourseContent({
  params,
}: {
  params: { courseId: string };
}) {
  const courseId = params.courseId;
  const rest: string[] = [];
  const course = await getCourse(parseInt(courseId, 10));
  const fullCourseContent = await getFullCourseContent(parseInt(courseId, 10));
  const courseContent = findContentById(
    fullCourseContent,
    rest.map((x) => parseInt(x, 10)),
  );
  const contentType =
    courseContent?.length === 1 ? courseContent[0]?.type : 'folder';

  if (contentType === 'video') {
    return (
      <div className="mx-auto max-w-screen-xl justify-between p-4 text-white">
        Video
      </div>
    );
  }

  if (contentType === 'notion') {
    return (
      <div className="text-blacke mx-auto max-w-screen-xl justify-between p-4 dark:text-white">
        Notion doc
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl justify-between p-4 text-black dark:text-white">
      <div className="text-xl font-semibold">
        Course: <span className="font-bold">{course.title}</span>
      </div>
      <div className="my-1.5 font-bold md:text-4xl lg:text-5xl">
        Add Content
      </div>
      <AddContent
        courseId={parseInt(courseId, 10)}
        parentContentId={parseFloat(rest[rest.length - 1])}
      />
      <AdminCourseContent
        rest={rest}
        //@ts-ignore
        courseContent={courseContent?.map((x: any) => ({
          title: x?.title || '',
          image: x?.thumbnail || '',
          id: x?.id || 0,
        }))}
        courseId={parseInt(courseId, 10)}
      />
    </div>
  );
}
