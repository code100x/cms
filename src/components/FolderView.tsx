'use client';
import { useRouter } from 'next/navigation';
import { ContentCard } from './ContentCard';
import { useRecoilState } from 'recoil';
import { sidebarSegments as sidebarSegmentsAtom } from '@/store/atoms/sidebarSegments';
import { useEffect } from 'react';

export const FolderView = ({
  courseContent,
  courseId,
  rest,
}: {
  courseId: number
  rest: string[]
  courseContent: {
    title: string
    image: string
    id: number
  }[]
}) => {
  const router = useRouter();
  const [sidebarSegments, setSidebarSegments] =
    useRecoilState(sidebarSegmentsAtom);

  if (!courseContent.length) {
    return (
      <div className="flex mt-64">
        <div className="m-auto">No content here yet!</div>
      </div>
    );
  }
  let updatedRoute = `/courses/${courseId}`;
  for (let i = 0; i < rest.length; i++) {
    updatedRoute += `/${rest[i]}`;
  }
  // why? because we have to reset the segments or they will be visible always after a video
  useEffect(() => {
    if (sidebarSegments.length > 0) {
      setSidebarSegments([]);
    }
  }, []);
  return (
    <div>
      <div></div>
      <div className="max-w-screen-xl justify-between mx-auto p-4 cursor-pointer grid grid-cols-1 gap-5 md:grid-cols-3">
        {courseContent.map(
          (content: { image: string; id: number; title: string }) => (
            <ContentCard
              key={content.id}
              title={content.title}
              image={content.image || ''}
              onClick={() => {
                router.push(`${updatedRoute}/${content.id}`);
              }}
            />
          ),
        )}
      </div>
    </div>
  );
};
