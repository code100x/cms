'use client';
import { useRouter } from 'next/navigation';
import { ContentCard } from './ContentCard';
import { courseContent, getFilteredContent } from '@/lib/utils';
import { useRecoilValue } from 'recoil';
import { selectFilter } from '@/store/atoms/filterContent';

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
  if (filteredCourseContent?.length === 0) {
    const filterMessages = {
      watched: "You haven't completed any content in this section yet.",
      watching: "No content currently in progress.",
      unwatched: "No new content available to watch.",
      all: "No content available in this section.",
    };
  
    return (
      <div className="mt-56 flex">
        <div className="m-auto text-center text-gray-500 text-xl">
          {filterMessages[currentfilter as keyof typeof filterMessages] || "No content found."}
        </div>
      </div>
    );
  }
  
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourseContent.map((content) => {
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
