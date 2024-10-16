import { getFullCourseContent } from '@/db/course';
import NotesRenderer from '@/components/NotesRenderer';

export default async function Course({
  params,
}: {
  params: { courseId: string, notesId: string[] };
}) {
  const courseId = params.courseId;
  const fullCourseContent = await getFullCourseContent(parseInt(courseId, 10));

  return (
    <div>
      <NotesRenderer params={params} fullCourseContent={fullCourseContent} />
    </div>
  );
}
