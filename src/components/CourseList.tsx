'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FullCourseContent } from '@/db/course';
import { File, VideoIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import BookmarkButton from './bookmark/BookmarkButton';
import { cn, handleMarkAsCompleted } from '@/lib/utils';
import Link from 'next/link';
import { CourseListSheet } from './CourseListSheet';
export function ContentList({
  courseId,
  fullCourseContent,
}: {
  fullCourseContent: FullCourseContent[];
  courseId: string;
}) {
  const pathName = usePathname();

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
            className={cn(
              '',
              content.type === 'folder' && isActiveContent
                ? 'bg-gray-100 text-black dark:bg-slate-900 dark:text-white'
                : '',
            )}
          >
            <AccordionTrigger className="ml-2 text-lg tracking-wide">
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
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex">
              <div className="pr-2">
                {content.type === 'video' ? <VideoIcon /> : null}
                {content.type === 'notion' ? <File /> : null}
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
  return (
    <div>
      <div className="mt-2 hidden h-full w-[282px] min-w-56 border lg:inline-block">
        <h1 className="flex h-14 items-center justify-center border-b text-lg">
          Course Content
        </h1>
        <Accordion type="single" collapsible className="w-full">
          {renderContent(fullCourseContent)}
        </Accordion>
      </div>
      <CourseListSheet>{renderContent(fullCourseContent)}</CourseListSheet>
    </div>
  );
}
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
