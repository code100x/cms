import { redirect } from 'next/navigation';
import { BookOpenText } from 'lucide-react';
import { getContentById } from '@/db/course';
import ContentEditForm from '@/components/admin/ContentEditForm';

const ContentPage = async ({
  params,
}: {
  params: { courseId: string; contentId: string };
}) => {
  const { contentId } = params;
  const courseId = parseInt(params.courseId, 10);
  const content = await getContentById(parseInt(contentId, 10));
  if (!content) {
    return redirect('/');
  }
  const requiredFields = [
    content.title,
    content.description,
    content.children?.filter((item: any) => item.type === 'video'),
    content.thumbnail,
  ];
  const totalFields = requiredFields?.length;
  const completedFields = requiredFields?.filter((item) => item?.length).length;
  const indicator = `(${completedFields}/${totalFields})`;

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-x-2">
          <div className="flex items-center gap-x-2">
            <BookOpenText size={20} className="h-8 w-8 rounded-lg border p-2" />
            <h2 className="text-xl font-medium">Customize course contents</h2>
          </div>
          <p className="ml-10 mt-2 text-sm">Complete all fields {indicator}</p>
        </div>
      </div>
      <div className="mt-10 w-full">
        <ContentEditForm
          content={content}
          contentId={contentId}
          courseId={courseId}
        />
      </div>
    </div>
  );
};

export default ContentPage;
