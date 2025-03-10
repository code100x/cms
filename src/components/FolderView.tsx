'use client';
import { useRouter } from 'next/navigation';
import { ContentCard } from './ContentCard';
import { courseContent, getFilteredContent } from '@/lib/utils';
import { useRecoilValue } from 'recoil';
import { selectFilter } from '@/store/atoms/filterContent';
import { useEffect,useRef } from 'react';

export const FolderView = ({
  courseContent,
  courseId,
  rest,
}: {
  courseId: number;
  rest: string[];
  courseContent: courseContent[];
}) => {
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (rest.length == 0) {
      const savedScrollY = sessionStorage.getItem(`scrollPosition-${courseId}`);
      if (savedScrollY) {
        window.scrollTo(0, parseInt(savedScrollY, 10));
        console.log("scrooliing");
      }
      const handleScrollY = () => {
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          sessionStorage.setItem(`scrollPosition-${courseId}`, window.scrollY.toString());
        }, 200); // Adjust the delay as needed
      };

      window.addEventListener("scroll", handleScrollY);
      return () => {
        window.removeEventListener("scroll", handleScrollY);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    }
  }, []);
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
          {filterMessages[currentfilter] || "No content found."}
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
