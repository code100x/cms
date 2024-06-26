'use client';
import { useRouter } from 'next/navigation';
import { ContentCard } from '../ContentCard';

export const AdminCourseContent = ({
  courseContent,
  courseId,
}: {
  courseId: number;
  courseContent: {
    title: string;
    image: string;
    id: number;
  }[];
}) => {
  const router = useRouter();

  return (
    <div>
      Course content
      <div className="mx-auto grid max-w-screen-xl cursor-pointer grid-cols-1 justify-between gap-5 p-4 md:grid-cols-3">
        {courseContent.map(
          (content: { image: string; id: number; title: string }) => (
            <ContentCard
              type={'folder'}
              title={content.title}
              image={content.image || ''}
              onClick={() => {
                router.push(`/admin/content/${courseId}/${content.id}`);
              }}
              key={content.id}
            />
          ),
        )}
      </div>
    </div>
  );
};
