'use client';
import { usePathname, useRouter } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Folder } from '@/db/course';
import { Button } from './ui/button';
import { BackArrow } from '@/icons/BackArrow';
import { useRecoilState } from 'recoil';
import { sidebarOpen as sidebarOpenAtom } from '@/store/atoms/sidebar';
import { useEffect, useState } from 'react';
import { sidebarSegments as sidebarSegmentsAtom } from '../store/atoms/sidebarSegments';
import { formatTime } from '../lib/utils';

enum TabType {
  Content = 'content',
  Segments = 'segments',
}
export function Sidebar({
  courseId,
  fullCourseContent,
}: {
  fullCourseContent: Folder[];
  courseId: string;
}) {
  const router = useRouter();
  const currentPath = usePathname();
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom);
  const [sidebarSegments] = useRecoilState(sidebarSegmentsAtom);
  const [tabType, setTapType] = useState<TabType.Content | TabType.Segments>(
    TabType.Content,
  );

  useEffect(() => {
    if (window.innerWidth < 500) {
      setSidebarOpen(false);
    }
  }, []);

  const findPathToContent = (
    contents: any,
    targetId: any,
    currentPath: any[] = [],
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
      router.push(path);
    }
  };
  const handleTabChange = (tab: TabType) => {
    if (tabType === tab) return;
    setTapType(tab);
  };
  const handleNavigateToSegment = (start: number) => {
    router.push(`${currentPath}?time=${start}`);
  };
  const renderContent = (contents: any) => {
    return contents.map((content: any) => {
      if (content.children && content.children.length > 0) {
        // This is a folder with children
        return (
          <div key={content.id}>
            {sidebarSegments.length > 0 && (
              <div className="flex justify-around my-2">
                <button
                  onClick={() => handleTabChange(TabType.Content)}
                  className={`${tabType === 'content' ? 'border-gray-300' : ''} border-b-2 p-2 hover:text-gray-400`}
                >
                  Content
                </button>
                <button
                  onClick={() => handleTabChange(TabType.Segments)}
                  className={`${tabType !== 'content' ? 'border-gray-300' : ''} border-b-2 p-2 hover:text-gray-400`}
                >
                  Chapters
                </button>
              </div>
            )}
            {tabType === TabType.Content ? (
              <AccordionItem value={`item-${content.id}`}>
                <AccordionTrigger>{content.title}</AccordionTrigger>
                <AccordionContent>
                  {/* Render the children of this folder */}
                  {renderContent(content.children)}
                </AccordionContent>
              </AccordionItem>
            ) : (
              <div>
                <ul>
                  {sidebarSegments.map((segment) => (
                    <li
                      key={`${segment.start}${segment.title}`}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        handleNavigateToSegment(segment.start);
                      }}
                    >
                      {segment.title} - {formatTime(segment.start)} -{' '}
                      {formatTime(segment.end)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      }
      // This is a video or a content item without children
      return (
        <div
          key={content.id}
          className="p-2"
          onClick={() => {
            navigateToContent(content.id);
          }}
        >
          {content.title}
        </div>
      );
    });
  };

  if (!sidebarOpen) {
    return null;
  }

  return (
    <div className="w-64">
      <div className="px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 cursor-pointer  h-[100dvh] w-full sticky top-0">
        <div className="flex">
          {/* <ToggleButton
            onClick={() => {
              setSidebarOpen((s) => !s);
            }}
          /> */}
          <GoBackButton />
        </div>
        <Accordion type="single" collapsible className="w-full">
          {/* Render course content */}
          {renderContent(fullCourseContent)}
        </Accordion>
      </div>
    </div>
  );
}

export function ToggleButton({
  onClick,
  sidebarOpen,
}: {
  onClick: () => void;
  sidebarOpen: boolean;
}) {
  console.log(sidebarOpen);
  return (
    <button
      onClick={onClick}
      className="flex flex-col justify-center items-center"
    >
      <span
        className={`dark:bg-white bg-black block transition-all duration-300 ease-out  h-0.5 w-6 rounded-sm ${sidebarOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}
      ></span>
      <span
        className={`dark:bg-white bg-black block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm my-0.5 ${
    sidebarOpen ? 'opacity-0' : 'opacity-100'
    }`}
      ></span>
      <span
        className={`dark:bg-white bg-black block transition-all duration-300 ease-out 
                    h-0.5 w-6 rounded-sm ${
    sidebarOpen
      ? '-rotate-45 -translate-y-1'
      : 'translate-y-0.5'
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
    <div className="w-full">
      {/* Your component content */}
      <Button size={'full'} onClick={goBack}>
        <BackArrow /> <div className="pl-4">Go Back</div>
      </Button>
    </div>
  );
}
