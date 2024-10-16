import { QueryParams } from '@/actions/types';
import { getFullCourseContent } from '@/db/course';
import { NotesView } from '@/components/NotesView';

export default async function Notes({
  params,

}: {
  params: { courseId: string };
  searchParams: QueryParams;
  children: any;
}) {
  const courseId = params.courseId;

  const fullCourseContent = await getFullCourseContent(parseInt(courseId, 10));

  return (
    <div className="relative flex flex-col py-8">
      <NotesView fullCourseContent={fullCourseContent} courseId={courseId} />
    </div>
  );
}