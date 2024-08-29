'use client';
import { usePathname } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChevronsRight, ChevronsLeft, Play, NotebookText } from 'lucide-react';
import { FullCourseContent } from '@/db/course';
import { useRecoilState } from 'recoil';
import { sidebarOpen as sidebarOpenAtom } from '@/store/atoms/sidebar';
import { useEffect, useState } from 'react';
import { handleMarkAsCompleted } from '@/lib/utils';
import BookmarkButton from './bookmark/BookmarkButton';
import Link from 'next/link';
import { Button } from './ui/button';

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
        currentUrlContentId = Number(urlPathString.split('/')[1]); // get the content id, e.g '/1/2' => 1 (number)
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
              content.type === 'folder' && isActiveContent ? 'bg-primary/5' : ''
            }
          >
            <AccordionTrigger className="px-4 text-lg font-bold">
              {content.title}
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-1 px-2 pb-2">
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
          className={`flex w-full cursor-pointer items-center rounded-md p-4 tracking-tight ${isActiveContent ? 'bg-primary/10' : 'bg-primary/5'}`}
        >
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Check content={content} />
                {content.type === 'video' && <Play className="size-4" />}
                {content.type === 'notion' && (
                  <NotebookText className="size-4" />
                )}
              </div>
              <div className="truncate text-base">{content.title}</div>
            </div>
            {content.type === 'video' && (
              <BookmarkButton
                bookmark={content.bookmark ?? null}
                contentId={content.id}
              />
            )}
          </div>
        </Link>
      );
    });
  };

  if (!sidebarOpen) {
    return (
      <Button
        className="fixed left-0 top-[50vh] z-[999] mx-4 cursor-pointer"
        onClick={() => setSidebarOpen((s) => !s)}
      >
        Course Content <ChevronsRight className="size-6" />
      </Button>
    );
  }

  return (
    <div className="fixed z-[99999] h-screen w-full overflow-y-scroll rounded-r-lg border border-primary/10 bg-background md:max-w-[300px]">
      <div className="flex items-center justify-between p-4">
        <h4 className="text-xl font-bold tracking-tighter text-primary md:text-2xl">
          Course Content
        </h4>
        <Button
          variant={'ghost'}
          size={'icon'}
          onClick={() => {
            setSidebarOpen((s) => !s);
          }}
        >
          <ChevronsLeft className="size-6" />
        </Button>
      </div>
      <Accordion type="single" collapsible className="w-full px-2 capitalize">
        {/* Render course content */}
        {renderContent(fullCourseContent)}
      </Accordion>
    </div>
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
        className="focus:ring-none h-4 w-4 rounded-md border-primary/10"
      />
    </>
  );
}
