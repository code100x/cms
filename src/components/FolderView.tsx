'use client';
import { useRouter } from 'next/navigation';
import { ContentCard } from './ContentCard';
import { Bookmark } from '@prisma/client';
import { sidebarOpen as sidebarOpenAtom } from '@/store/atoms/sidebar';
import { useRecoilState } from 'recoil';

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
    videoFullDuration?: number;
    duration?: number;
    bookmark: Bookmark | null;
    createdAt: Date;
  }[];
}) => {
  const router = useRouter();
  const [sidebarOpen] = useRecoilState(sidebarOpenAtom);

  if (!courseContent?.length) {
    return (
      <div className="mt-64 flex">
        <div className="m-auto">No content here yet!</div>
      </div>
    );
  }
  let updatedRoute = `/courses/${courseId}`;
  for (let i = 0; i < rest.length; i++) {
    updatedRoute += `/${rest[i]}`;
  }
  // why? because we have to reset the segments or they will be visible always after a video

  return (
    <div>
      <div
        className={`grid max-w-screen-xl grid-cols-1 justify-between gap-5 px-2 py-4 md:${sidebarOpen ? 'grid-cols-3' : 'grid-cols-4'} lg:${sidebarOpen ? 'grid-cols-3' : 'grid-cols-4'}`}
      >
        {courseContent.map((content) => {
          const videoProgressPercent =
            content.type === 'video' &&
            content.videoFullDuration &&
            content.duration
              ? (content.duration / content.videoFullDuration) * 100
              : 0;
          return (
            <ContentCard
              type={content.type}
              contentId={content.id}
              key={content.id}
              title={content.title}
              image={content.image || ''}
              onClick={() => {
                router.push(`${updatedRoute}/${content.id}`);
              }}
              markAsCompleted={content.markAsCompleted}
              percentComplete={content.percentComplete}
              videoProgressPercent={videoProgressPercent}
              bookmark={content.bookmark}
              contentDuration={content.videoFullDuration}
              createdAt={content.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
};
