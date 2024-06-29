'use client';
import { useRouter } from 'next/navigation';
import { ContentCard } from '../ContentCard';
import { AddContent } from './AddContent';

export const AdminCourseContent = ({
  courseContent,
  courseId,
  rest,
}: {
  courseId: number;
  courseContent: {
    title: string;
    image: string;
    id: number;
  }[];
  rest: string[];
}) => {
  const router = useRouter();

  return (
    <div>
      <div className="text-center font-serif text-2xl">Edit Content</div>
      <div className="mx-auto grid max-w-screen-xl cursor-pointer grid-cols-1 justify-between gap-5 p-4 md:grid-cols-3">
        {courseContent.map(
          (content: { image: string; id: number; title: string }) => (
            <ContentCard
              type={'folder'}
              title={content.title}
              image={content.image || ''}
              onClick={() => {
                router.push(`/admin/course/${courseId}/${content.id}`);
              }}
              key={content.id}
            />
          ),
        )}
        <AddContent
          courseId={courseId}
          parentContentId={parseFloat(rest[rest.length - 1])}
        />
      </div>
    </div>
  );
};
