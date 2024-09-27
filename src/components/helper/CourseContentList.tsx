'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Play, File } from 'lucide-react';
import { FullCourseContent } from '@/db/course';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { handleMarkAsCompleted } from '@/lib/utils';
import BookmarkButton from '../bookmark/BookmarkButton';
import Link from 'next/link';

export default function CourseContentList({
  courseId,
  fullCourseContent,
}: {
  fullCourseContent: FullCourseContent[];
  courseId: number;
}) {
  const pathName = usePathname();
  const [currentActiveContentIds, setCurrentActiveContentIds] = useState<
    number[]
  >([]);

  const findPathToContent = useCallback(
    (
      contents: FullCourseContent[],
      targetId: number,
      currentPath: number[] = [],
    ): number[] | null => {
      for (const content of contents) {
        const newPath = [...currentPath, content.id];
        if (content.id === targetId) return newPath;
        if (content.children) {
          const childPath = findPathToContent(
            content.children,
            targetId,
            newPath,
          );
          if (childPath) return childPath;
        }
      }
      return null;
    },
    [],
  );

  useEffect(() => {
    const urlRegex = /\/courses\/.*./;
    const courseUrlRegex = /\/courses\/\d+((?:\/\d+)+)/;

    if (urlRegex.test(pathName)) {
      const matchArray = pathName.match(courseUrlRegex);
      if (matchArray) {
        const currentUrlContentId = Number(matchArray[1].split('/')[1]);
        const pathArray = findPathToContent(
          fullCourseContent,
          currentUrlContentId,
        );
        setCurrentActiveContentIds(pathArray || []);
      }
    }
  }, [pathName, findPathToContent, fullCourseContent]);

  const navigateToContent = useCallback(
    (contentId: number) => {
      const pathArray = findPathToContent(fullCourseContent, contentId);
      return pathArray ? `/courses/${courseId}/${pathArray.join('/')}` : null;
    },
    [courseId, findPathToContent, fullCourseContent],
  );

  const renderContent = useCallback(
    (contents: FullCourseContent[]) => {
      return contents.map((content) => {
        const isActiveContent = currentActiveContentIds?.includes(content.id);

        if (content.children && content.children.length > 0) {
          return (
            <AccordionItem
              key={content.id}
              value={`item-${content.id}`}
              className={`rounded-md border-none ${isActiveContent ? 'bg-primary/5' : ''}`}
            >
              <AccordionTrigger className="rounded-md px-4 text-lg font-medium capitalize">
                {content.title}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-1 px-2 pb-2">
                {renderContent(content.children)}
              </AccordionContent>
            </AccordionItem>
          );
        }

        return (
          <Link
            key={content.id}
            href={navigateToContent(content.id) || '#'}
            className={`flex w-full cursor-pointer items-center rounded-md p-4 tracking-tight hover:bg-primary/10 ${isActiveContent ? 'bg-primary/10' : ''}`}
          >
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Check content={content} />
                {content.type === 'video' && <Play className="size-4" />}
                {content.type === 'notion' && <File className="size-4" />}
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
    },
    [currentActiveContentIds, navigateToContent],
  );

  const memoizedContent = useMemo(
    () => renderContent(fullCourseContent),
    [fullCourseContent, renderContent],
  );

  return (
    <Accordion type="multiple" className="w-full capitalize">
      {memoizedContent}
    </Accordion>
  );
}

function Check({ content }: { content: any }) {
  const [completed, setCompleted] = useState(
    content?.videoProgress?.markAsCompleted || false,
  );

  const handleCheck = useCallback(
    async (e: React.MouseEvent<HTMLInputElement>) => {
      e.stopPropagation();
      const newState = !completed;
      setCompleted(newState);
      await handleMarkAsCompleted(newState, content.id);
    },
    [completed, content.id],
  );

  return (
    <input
      checked={completed}
      onChange={() => {}} // Controlled component
      onClick={handleCheck}
      type="checkbox"
      className="focus:ring-none h-4 w-4 rounded-md border-primary/10"
    />
  );
}
