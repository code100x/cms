import { getCourse, getFullCourseContent } from '@/db/course';
import { AddContent } from '@/components/admin/AddContent';
import { AdminCourseContent } from '@/components/admin/CourseContent';
import findContentById from '@/lib/find-content-by-id';
import { UpdateVideoClient } from '@/components/admin/UpdateVideoClient';

export default async function UpdateCourseContent({
  params,
}: {
  params: { moduleId: string[]; courseId: string };
}) {
  const courseId = params.courseId;
  const rest = params.moduleId;
  const course = await getCourse(parseInt(courseId, 10));
  const fullCourseContent = await getFullCourseContent(parseInt(courseId, 10));

  const courseContent = findContentById(
    fullCourseContent,
    rest.map((x) => parseInt(x, 10)),
  );
  const contentType = courseContent?.folder
    ? 'folder'
    : courseContent?.value?.type;

  if (contentType === 'video') {
    return (
      <div className="mx-auto max-w-screen-xl justify-between p-4 text-white">
        {/* @ts-ignore */}
        <UpdateVideoClient content={courseContent.value} />
      </div>
    );
  }

  if (contentType === 'notion') {
    return (
      <div className="text-blacke mx-auto max-w-screen-xl justify-between p-4 dark:text-white">
        {/* <NotionRenderer id={courseContent[0]?.id} /> */}
        Notion doc
      </div>
    );
  }

  return (
    <main className="wrapper flex max-w-screen-xl flex-col gap-28">
      <div className="flex w-full flex-col justify-between gap-2 rounded-lg border-2 bg-primary/5 p-4">
        <h1 className="text-3xl font-bold md:text-4xl">Content</h1>
        <p className="text-xl capitalize">{course?.title}</p>
      </div>

      <AddContent
        rest={rest}
        courseTitle={course?.title}
        courseId={parseInt(courseId, 10)}
        parentContentId={parseFloat(rest[rest.length - 1])}
      />

      <AdminCourseContent
        rest={rest}
        // @ts-ignore
        courseContent={courseContent?.value?.map((x: any) => ({
          title: x?.title || '',
          image: x?.thumbnail || '',
          id: x?.id || 0,
          createdAt: x?.createdAt,
        }))}
        courseId={parseInt(courseId, 10)}
      />
    </main>
  );
}
