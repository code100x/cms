'use client';
import { useRouter } from 'next/navigation';
import { ContentCard } from './ContentCard';
import { courseContent, getFilteredContent } from '@/lib/utils';
import { useRecoilValue } from 'recoil';
import { selectFilter } from '@/store/atoms/filterContent';

type ContentType = 'folder' | 'video' | 'notion';
export const FolderView = ({
  courseContent,
  courseId,
  rest,
}: {
  courseId: number;
  rest: string[];
  courseContent: courseContent[];
}) => {
  const router = useRouter();
  const contentOrder: { [key in ContentType]: number } = { folder: 1, video: 2, notion: 3 };
  const sortedCourseContents = courseContent
    ?.filter(({ type }: { type: ContentType }) => ['folder', 'video', 'notion'].includes(type))
    .sort((a: any, b: any) => {
      return contentOrder[a.type as ContentType] - contentOrder[b.type as ContentType] || a.position - b.position;
    });
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

  const currentfilter = useRecoilValue(selectFilter);

  const filteredCourseContent = getFilteredContent(
    courseContent,
    currentfilter,
  );

  return (
    <div>
      <div className="mx-auto grid max-w-screen-xl cursor-pointer grid-cols-1 justify-between gap-5 p-4 md:grid-cols-3">
        {sortedCourseContents.map((content) => {
          const videoProgressPercent =
            content.type === 'video' &&
              content.videoFullDuration &&
              content.duration
              ? (content.duration / content.videoFullDuration) * 100
              : content.percentComplete || 0;

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
