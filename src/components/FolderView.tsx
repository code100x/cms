'use client';
import { useRouter } from 'next/navigation';
import { ContentCard } from './ContentCard';
import { Bookmark } from '@prisma/client';
import { CourseContentType } from '@/lib/utils';

export const FolderView = ({
  courseContent,
  courseId,
  rest,
}: {
  courseId: number;
  rest: string[];
  courseContent: {
    type: CourseContentType;
    title: string;
    image: string;
    id: number;
    markAsCompleted: boolean;
    percentComplete: number | null;
    videoFullDuration?: number;
    duration?: number;
    bookmark: Bookmark | null;
    weeklyContentTitles?: string[];
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

  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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
              weeklyContentTitles={content.weeklyContentTitles}
            />
          );
        })}
      </div>
    </div>
  );
};
