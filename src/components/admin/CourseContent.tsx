'use client';
import { useRouter } from 'next/navigation';
import { ContentCard } from '../helper/ContentCard';

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
    createdAt: Date;
  }[];
  rest: string[];
}) => {
  const router = useRouter();
  let updatedRoute = `/admin/content/${courseId}`;
  for (let i = 0; i < rest.length; i++) {
    updatedRoute += `/${rest[i]}`;
  }

  return (
    <div>
      <div className="mx-auto grid cursor-pointer grid-cols-1 justify-between gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courseContent?.map(
          (content: {
            image: string;
            id: number;
            title: string;
            createdAt: Date;
          }) => (
            <ContentCard
              type={'folder'}
              title={content.title}
              image={content.image || ''}
              onClick={() => {
                router.push(`${updatedRoute}/${content.id}`);
              }}
              key={content.id}
            />
          ),
        ) ?? []}
      </div>
    </div>
  );
};
