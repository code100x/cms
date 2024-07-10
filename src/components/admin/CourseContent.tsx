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
      <h1 className="text-2xl font-bold">Course content</h1>
      <div className="mx-auto grid max-w-screen-xl cursor-pointer grid-cols-1 justify-between gap-5 p-4 md:grid-cols-3">
        {courseContent && courseContent.length > 0 ? (
          courseContent.map(
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
          )
        ) : (
          <div className="flex h-48 items-center justify-center rounded-lg bg-gray-100 shadow-md dark:bg-gray-800">
            <p className="text-lg font-semibold text-gray-500 dark:text-gray-400">
              No Content Added Here Yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
