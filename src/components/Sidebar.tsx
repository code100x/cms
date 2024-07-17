'use client';
import { usePathname, useRouter } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FullCourseContent } from '@/db/course';
import BackArrow from '@/icons/BackArrow';
import { useRecoilState } from 'recoil';
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

  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom);
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

  useEffect(() => {
    if (window.innerWidth < 500) {
      setSidebarOpen(false);
    }
  }, []);

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
    return contents.map((content, index) => {
      const isActiveContent = currentActiveContentIds?.some(
        (id) => content.id === id,
      );
      if (content.children && content.children.length > 0) {
        // This is a folder with children
        const capitalizetitle =
          content.title.charAt(0).toUpperCase() + content.title.slice(1);
        return (
          <AccordionItem
            key={content.id}
            value={`item-${content.id}`}
            className={`${index === 0 && 'rounded-t-md'} ${
              content.type === 'folder' && isActiveContent
                ? 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white'
                : 'dark:bg-gray-800'
            } `}
          >
            <AccordionTrigger className="pl-3 pr-2 text-left">
              {capitalizetitle}
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
          className={`flex cursor-pointer border-b p-2 hover:bg-gray-200 dark:border-b-gray-800 ${
            isActiveContent
              ? 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white'
              : 'bg-gray-50 text-black dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
          }`}
        >
          <div className="flex w-full justify-between py-1 pl-3">
            <div className="flex items-center">
              <div className="pr-2">
                {content.type === 'video' ? <VideoIcon /> : null}
                {content.type === 'notion' ? <NotionIcon /> : null}
              </div>
              <div>{content.title}</div>
            </div>
            {content.type === 'video' ? (
              <div className="flex items-center gap-1 pr-1">
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
    return null;
  }

  return (
    <div className="custom-scrollbar w-84 sticky top-[64px] mx-2 h-sidebar w-[400px] min-w-[400px] self-start overflow-y-auto overflow-x-hidden bg-gray-50 px-2 dark:bg-background">
      <div className="z-50 flex w-full items-center justify-between px-4">
        <GoBackButton />
        <div
          onClick={() => {
            setSidebarOpen((s: boolean) => !s);
          }}
        >
          <ToggleButton sidebarOpen={!sidebarOpen} />
        </div>
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full rounded-t-md drop-shadow-md"
      >
        {/* Render course content */}
        {renderContent(fullCourseContent)}
      </Accordion>
    </div>
  );
}

export function ToggleButton({ sidebarOpen }: { sidebarOpen: boolean }) {
  return (
    <button className="flex flex-col items-center justify-center py-1">
      <span
        className={`block h-0.5 w-6 rounded-sm bg-black transition-all duration-300 ease-out dark:bg-white ${!sidebarOpen ? 'translate-y-1 rotate-45' : '-translate-y-0.5'}`}
      ></span>
      <span
        className={`my-0.5 block h-0.5 w-6 rounded-sm bg-black transition-all duration-300 ease-out dark:bg-white ${
          !sidebarOpen ? 'opacity-0' : 'opacity-100'
        }`}
      ></span>
      <span
        className={`block h-0.5 w-6 rounded-sm bg-black transition-all duration-300 ease-out dark:bg-white ${
          !sidebarOpen ? '-translate-y-1 -rotate-45' : 'translate-y-0.5'
        }`}
      ></span>
    </button>
  );
}

function GoBackButton() {
  const router = useRouter();

  const goBack = () => {
    const pathSegments = window.location.pathname.split('/');

    // Remove the last segment of the path
    pathSegments.pop();

    // Check if it's the last page in the course, then go to root
    if (pathSegments.length <= 2) {
      router.push('/');
    } else {
      const newPath = pathSegments.join('/');
      router.push(newPath);
    }
  };

  return (
    <div className="my-4 w-full">
      {/* Your component content */}
      <div
        onClick={goBack}
        className="group flex w-fit cursor-pointer items-center justify-center"
      >
        <BackArrow className="h-5 w-5 stroke-black transition-all duration-200 ease-in-out group-hover:-translate-x-1 dark:stroke-white rtl:rotate-180" />
        <p className="pl-3">Go Back</p>
      </div>
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
      className="h-4 w-4"
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
      className="h-4 w-4"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
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
        className="custom-checkbox h-4 w-4 cursor-pointer"
      />
    </>
  );
}
