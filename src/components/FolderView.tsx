'use client';
import { useRouter } from 'next/navigation';
import { ContentCard } from './ContentCard';
import { useRecoilValue } from 'recoil';
import { videoCompletionAtom } from '@/store/atoms/videoCompletion';
import { getFolderContentCompleted } from '@/lib/utils';

export const FolderView = ({
  courseContent,
  courseId,
  rest,
}: {
  courseId: number;
  rest: string[];
  courseContent: {
    type: 'folder' | 'video' | 'notion';
    title: string;
    image: string;
    id: number;
    markAsCompleted: boolean;
    percentComplete: number | null;
  }[];
}) => {
  const router = useRouter();

  if (!courseContent?.length) {
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
  const videoCompletion = useRecoilValue(videoCompletionAtom);
  return (
    <div>
      <div></div>
      <div className="max-w-screen-xl justify-between mx-auto p-4 cursor-pointer grid grid-cols-1 gap-5 md:grid-cols-3">
        {courseContent.map((content) => {
          let percent = null;
          let isCompleted = false;
          if (content.type === 'folder') {
            percent = getFolderContentCompleted(videoCompletion , content.id);
          } else if (content.type === 'video') {
            isCompleted = videoCompletion.find((item) => item.id === content.id)?.isCompleted || false;
          }
          return (
            <ContentCard
              type={content.type}
              key={content.id}
              title={content.title}
              image={content.image || ''}
              onClick={() => {
                router.push(`${updatedRoute}/${content.id}`);
              }}
              markAsCompleted={isCompleted}
              percentComplete={percent}
            />
          );
        })}
      </div>
    </div>
  );
};
