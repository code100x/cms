import {
  getCourse,
  getCourseContent,
  getCurrentContentType,
} from '@repo/db/course';
import { AddContent } from '@/components/admin/AddContent';
import { AdminCourseContent } from '@/components/admin/CourseContent';

export default async function UpdateCourseContent({
  params,
}: {
  params: { courseId: string[] };
}) {
  const courseId = params.courseId[0];
  const rest = params.courseId.slice(1);
  const course = await getCourse(parseInt(courseId, 10));
  const courseContent = await getCourseContent(
    parseInt(courseId, 10),
    rest.map((x: string) => parseInt(x, 10)),
  );
  const contentType = await getCurrentContentType(
    parseInt(courseId, 10),
    rest.map((x: string) => parseInt(x, 10)),
  );

  if (contentType === 'video') {
    return (
      <div className="max-w-screen-xl justify-between mx-auto p-4 text-white">
        {/* <ContentRenderer nextContent={null} content={{ id: courseContent[0]?.id || 0, title: courseContent[0]?.title || "", type: contentType || "video", thumbnail: courseContent[0]?.thumbnail || "", description: courseContent[0]?.description ?? "" }} /> */}
        Video
      </div>
    );
  }

  if (contentType === 'notion') {
    return (
      <div className="max-w-screen-xl justify-between mx-auto p-4 dark:text-white text-blacke">
        {/* <NotionRenderer id={courseContent[0]?.id} /> */}
        Notion doc
      </div>
    );
  }

  return (
    <div className="max-w-screen-xl justify-between mx-auto p-4 dark:text-white text-black">
      {course?.title}
      <div className="font-bold  md:text-5xl lg:text-6xl">Content</div>
      <AddContent
        courseId={parseInt(courseId, 10)}
        parentContentId={parseFloat(rest[rest.length - 1])}
      />
      <AdminCourseContent
        courseContent={courseContent.map((x: any) => ({
          title: x?.title || '',
          image: x?.thumbnail || '',
          id: x?.id || 0,
        }))}
        courseId={parseInt(courseId, 10)}
      />
    </div>
  );
}
