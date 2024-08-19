'use client';
import { useRouter } from 'next/navigation';
import { ContentCard } from './ContentCard';
import { Bookmark } from '@prisma/client';
import { useRecoilValue } from 'recoil';
import { sidebarOpen as sidebarOpenAtom } from '@/store/atoms/sidebar';
import { mainSideBarToggle } from '@/store/atoms/mainSidebar';

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
    createdAt: Date | null;
  }[];
}) => {
  const router = useRouter();

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

  const sidebarOpen = useRecoilValue(sidebarOpenAtom);
  const isMainSideBarCompressed = useRecoilValue(mainSideBarToggle);


  return (
    <div>
      <div></div>
      <div className={`mx-auto grid max-w-screen-xl cursor-pointer grid-cols-1 justify-between gap-5 p-4 ${(sidebarOpen && !isMainSideBarCompressed) ? 'md:grid-cols-1 lg:grid-cols-2' : 'lg:grid-cols-3'}  ${(sidebarOpen && isMainSideBarCompressed) ? 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'} `}>
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
              createdAt={content.createdAt}
              contentDuration={content.videoFullDuration}
            />
          );
        })}
      </div>
    </div>
  );
};
