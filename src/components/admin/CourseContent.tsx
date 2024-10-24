'use client';
import { useRouter } from 'next/navigation';
import { ContentCard } from '../ContentCard';
import { RefreshCw } from 'lucide-react';
import { useRecoilState } from 'recoil';
import { trigger } from '@/store/atoms/trigger';
import { useEffect } from 'react';

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
  const [triggerRender, setTrigger] = useRecoilState(trigger);
  const router = useRouter();
  let updatedRoute = `/admin/content/${courseId}`;
  for (let i = 0; i < rest.length; i++) {
    updatedRoute += `/${rest[i]}`;
  }
  const handleClick = () => {
    setTrigger((prev) => prev + 1); // trigger a re-render, this is a hack
  };

  useEffect(() => {
    console.log('triggerRender', triggerRender);
    if (triggerRender) {
      console.log('refreshing');
      setTimeout(() => {
        router.refresh();
        setTrigger(0);
      }, 500);
    }
  }, [triggerRender]);

  return (
    <div>
      {
        <div className="flex-start gap=2 flex space-x-2">
          <span>Reload</span>
          <RefreshCw className="mb-6 cursor-pointer" onClick={handleClick} />
        </div>
      }

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
