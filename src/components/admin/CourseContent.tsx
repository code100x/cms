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
      <div className="max-w-screen-xl justify-between mx-auto p-4 cursor-pointer grid grid-cols-1 gap-5 md:grid-cols-3">
        {courseContent.map(
          (content: { image: string; id: number; title: string }) => (
            <ContentCard
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
