'use client';
import { usePathname, useRouter } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FullCourseContent } from '@/db/course';
import { Button } from './ui/button';
import { BackArrow } from '@/icons/BackArrow';
import { useRecoilState, useRecoilValue } from 'recoil';
import { sidebarOpen as sidebarOpenAtom } from '@/store/atoms/sidebar';
import { useEffect, useState } from 'react';
import { handleMarkAsCompleted } from '@/lib/utils';
import BookmarkButton from './bookmark/BookmarkButton';
import Link from 'next/link';

export function Sidebar({
  courseId,
  fullCourseContent,
}: {
  fullCourseContent: FullCourseContent[];
  courseId: string;
}) {
  const pathName = usePathname();
  const sidebarOpen = useRecoilValue(sidebarOpenAtom);
  const [currentActiveContentIds, setCurrentActiveContentIds] = useState<
    number[]
  >([]);

  useEffect(() => {
    const courseUrlRegex = /\/courses\/\d+((?:\/\d+)+)/;

    if (pathName.includes('courses')) {
      const matchArray = pathName.match(courseUrlRegex);
      let currentUrlContentId;
      // if matchArray is not null
      if (matchArray) {
        const urlPathString = matchArray[1];
        currentUrlContentId = Number(
          urlPathString.slice(urlPathString.length - 1),
        ); // get last content id from pathString e.g '/1/2' => 2 (number)
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
                ? 'dark:bg-gray-600  bg-gray-200 dark:text-white text-black dark:hover:bg-gray-500 hover:bg-gray-100'
                : ''
            }
          >
            <AccordionTrigger className="px-2 text-left">
              {content.title}
            </AccordionTrigger>
            <AccordionContent className="p-0 m-0">
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
          className={`p-2 flex border-b hover:bg-gray-200 cursor-pointer ${
            isActiveContent
              ? 'dark:bg-gray-700 bg-gray-300 dark:text-white text-black dark:hover:bg-gray-500'
              : 'bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white text-black'
          }`}
        >
          <div className="flex justify-between w-full">
            <div className="flex">
              <div className="pr-2">
                {content.type === 'video' ? <VideoIcon /> : null}
                {content.type === 'notion' ? <NotionIcon /> : null}
              </div>
              <div>{content.title}</div>
            </div>
            {content.type === 'video' ? (
              <div className="flex items-center gap-1">
                <BookmarkButton
                  bookmark={content.bookmark ?? null}
                  contentId={content.id}
                />
                <div className="flex flex-col justify-center ml-2">
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
    sidebarOpen && (
      <div className="overflow-y-scroll h-sidebar min-w-[300px] bg-gray-50 dark:bg-gray-800 absolute top-[64px] left-0 sm:sticky z-20">
        <GoBackButton />
        <Accordion type="single" collapsible className="w-full">
          {/* Render course content */}
          {renderContent(fullCourseContent)}
        </Accordion>
      </div>
    )
  );
}

export function ToggleButton() {
  const [sidebarOpen, setSidebarOpen] =
    useRecoilState<boolean>(sidebarOpenAtom);

  return (
    <button
      onClick={() => setSidebarOpen(!sidebarOpen)}
      className="flex flex-col justify-center items-center"
    >
      <span
        className={`dark:bg-white bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${sidebarOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}
      ></span>
      <span
        className={`dark:bg-white bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${sidebarOpen ? 'opacity-0' : 'opacity-100'}`}
      ></span>
      <span
        className={`dark:bg-white bg-black block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${sidebarOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}
      ></span>
    </button>
  );
}

function GoBackButton() {
  const router = useRouter();

  return (
    <div className="w-full p-2">
      {/* Your component content */}
      <Button
        size={'full'}
        onClick={() => router.back()}
        className="group rounded-full"
      >
        <BackArrow className="group-hover:-translate-x-1 w-5 h-5 rtl:rotate-180 transition-all duration-200 ease-in-out" />{' '}
        <div className="pl-4">Go Back</div>
      </Button>
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
      className="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
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
      className="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
      />
    </svg>
  );
}

function Check({ content }: { content: FullCourseContent }) {
  const [completed, setCompleted] = useState(
    content.videoProgress?.markAsCompleted || false,
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
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
    </>
  );
}
