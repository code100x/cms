'use client';
import { usePathname } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { X, ChevronRight } from 'lucide-react';
import { FullCourseContent } from '@/db/course';
import { useEffect, useRef, useState } from 'react';
import { handleMarkAsCompleted } from '@/lib/utils';
import BookmarkButton from './bookmark/BookmarkButton';
import Link from 'next/link';
import { courseSidebarOpen as courseSidebarOpenAtom } from '@/store/atoms/course-side-bar';
import { useSidebarMediaQuery } from '@/hooks/useSidebarMediaQuery';
import { useHandleClickOutside } from '@/hooks/useHandleClickOutside';

export function CourseSidebar({
  courseId,
  fullCourseContent,
}: {
  fullCourseContent: FullCourseContent[];
  courseId: string;
}) {
  const pathName = usePathname();

  const { isSmallScreen, sidebarOpen, setSidebarOpen } = useSidebarMediaQuery(
    '(min-width: 1100px)',
    courseSidebarOpenAtom,
  );
  const sideNavRef = useRef<HTMLDivElement | null>(null);

  useHandleClickOutside(sideNavRef, isSmallScreen, () => setSidebarOpen(false));

  const [currentActiveContentIds, setCurrentActiveContentIds] = useState<
    number[]
  >([]);

  useEffect(() => {
    const urlRegex = /\/courses\/.*./;
    const courseUrlRegex = /\/courses\/\d+((?:\/\d+)+)/;

    if (urlRegex.test(pathName)) {
      const matchArray = pathName.match(courseUrlRegex);
      let currentUrlContentId;
      // if matchArray is not null
      if (matchArray) {
        const urlPathString = matchArray[1];
        currentUrlContentId = Number(urlPathString.split('/')[1]); // get the content id, e.g '/1/2' => 1 (number)
      }
      const pathArray = findPathToContent(
        fullCourseContent,
        currentUrlContentId!,
      );
      setCurrentActiveContentIds(pathArray);
    }
  }, [pathName]);

  const findPathToContent = (
    contents: FullCourseContent[],
    targetId: number,
    currentPath: number[] = [],
  ): any => {
    for (const content of contents) {
      const newPath = [...currentPath, content.id];
      if (content.id === targetId) {
        return newPath;
      }
      if (content.children) {
        const childPath = findPathToContent(
          content.children,
          targetId,
          newPath,
        );
        if (childPath) {
          return childPath;
        }
      }
    }
    return null;
  };

  const navigateToContent = (contentId: any) => {
    const pathArray = findPathToContent(fullCourseContent, contentId);
    if (pathArray) {
      const path = `/courses/${courseId}/${pathArray.join('/')}`;
      return path;
    }
    return null;
  };

  const renderContent = (contents: FullCourseContent[]) => {
    return contents.map((content) => {
      const isActiveContent = currentActiveContentIds?.some(
        (id) => content.id === id,
      );
      if (content.children && content.children.length > 0) {
        // This is a folder with children
        return (
          <AccordionItem
            key={content.id}
            value={`item-${content.id}`}
            className={
              content.type === 'folder' && isActiveContent
                ? 'bg-gray-200 text-black dark:bg-blue-950/10 dark:text-white'
                : ''
            }
          >
            <AccordionTrigger className="px-4 text-lg tracking-wide">
              {content.title}
            </AccordionTrigger>
            <AccordionContent className="m-0 p-0">
              {/* Render the children of this folder */}
              {renderContent(content.children ?? [])}
            </AccordionContent>
          </AccordionItem>
        );
      }
      // This is a video or a content item without children
      return (
        <Link
          key={content.id}
          href={navigateToContent(content.id) || '#'}
          className={`flex cursor-pointer p-2 hover:bg-gray-950/5 ${
            isActiveContent
              ? 'border-b bg-gray-300 text-black dark:bg-blue-950/20 dark:text-white'
              : 'border-b bg-gray-50 text-black dark:bg-blue-950/5 dark:text-white'
          } `}
          onClick={() => setSidebarOpen(false)}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex">
              <div className="pr-2">
                {content.type === 'video' ? <VideoIcon /> : null}
                {content.type === 'notion' ? <NotionIcon /> : null}
              </div>
              <div className="text-sm tracking-wider">{content.title}</div>
            </div>
            {content.type === 'video' ? (
              <div className="flex items-center gap-1">
                <BookmarkButton
                  bookmark={content.bookmark ?? null}
                  contentId={content.id}
                />
                <div className="ml-2 flex flex-col justify-center">
                  <Check content={content} />
                </div>
              </div>
            ) : null}
          </div>
        </Link>
      );
    });
  };

  if (!sidebarOpen) {
    return (
      <div
        onClick={() => setSidebarOpen((s) => !s)}
        className="mt-4 h-fit cursor-pointer"
      >
        <ChevronRight
          size={24}
          className="rounded-br rounded-tr border-b border-r border-t"
        />
      </div>
    );
  }

  return (
    <div
      ref={sideNavRef}
      className="no-scrollbar absolute z-20 m-4 h-full w-[300px] min-w-[300px] self-start overflow-y-scroll scroll-smooth rounded-lg border bg-gray-50 dark:bg-[#020817] sm:sticky sm:top-[64px] sm:h-sidebar"
    >
      <div className="flex items-center justify-between border-b p-4">
        <h4 className="text-lg dark:text-[#F8FAFC]">Course Content</h4>
        <div
          className="cursor-pointer"
          onClick={() => {
            setSidebarOpen((s) => !s);
          }}
        >
          <X size={20} />
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {/* Render course content */}
        {renderContent(fullCourseContent)}
      </Accordion>
    </div>
  );
}

function VideoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
      />
    </svg>
  );
}

function NotionIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="h-5 w-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
}

// Todo: Fix types here
function Check({ content }: { content: any }) {
  const [completed, setCompleted] = useState(
    content?.videoProgress?.markAsCompleted || false,
  );
  return (
    <>
      <input
        defaultChecked={completed}
        onClick={async (e) => {
          setCompleted(!completed);
          handleMarkAsCompleted(!completed, content.id);
          e.stopPropagation();
        }}
        type="checkbox"
        className="h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
      />
    </>
  );
}
