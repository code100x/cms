'use client';
import { usePathname } from 'next/navigation';
import { File } from 'lucide-react';
import { FullCourseContent } from '@/db/course';
import { useEffect, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';

export function NotesView({
  courseId,
  fullCourseContent,
}: {
  fullCourseContent: FullCourseContent[];
  courseId: string;
}) {
  const pathName = usePathname();
  const [currentActiveContentIds, setCurrentActiveContentIds] = useState<number[]>([]);

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
      return pathArray ? `/courses/${courseId}/notes/${pathArray.join('/')}` : null;
    },
    [courseId, findPathToContent, fullCourseContent],
  );

  const renderContent = useCallback(
    (contents: FullCourseContent[]) => {
      return contents.map((content) => {
        const isActiveContent = currentActiveContentIds?.includes(content.id);
        const hasNotesChild = content.children?.some((child) => child.type === 'notion');

        if (content.children && content.children.length > 0 && hasNotesChild) {
          return (
            <div key={content.id}>
              <div className="rounded-md px-4 text-lg font-medium capitalize">
                {content.title}
              </div>
              <div className="flex flex-col gap-1 px-2 pb-2">
                {renderContent(content.children)}
              </div>
            </div>
          );
        }

        return (
          content.type === 'notion' && (
            <Link
              key={content.id}
              href={navigateToContent(content.id) || '#'}
              className={`flex w-full cursor-pointer items-center rounded-md p-4 tracking-tight hover:bg-primary/10 ${isActiveContent ? 'bg-primary/10' : ''
                }`}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex gap-2">
                    {content.type === 'notion' && <File className="size-4" />}
                  </div>
                  <div className="break-words text-base">{content.title}</div>
                </div>
              </div>
            </Link>
          )
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
    <>
      <div>
        <div>
          <div className="sticky top-0 z-10 flex items-center justify-between bg-neutral-50 p-5 dark:bg-neutral-900">
            <h4 className="text-xl font-bold tracking-tighter text-primary lg:text-2xl">
              All Notes
            </h4>
          </div>
          {memoizedContent.length === 0 ?
            <div className='flex w-full justify-center items-center'>
              <div className="mt-36 flex text-xl">
                <div className="m-auto">No content here yet!</div>
              </div>
            </div> :
            <div className='pt-6'>{memoizedContent}</div>
          }
        </div>
      </div>
    </>
  );
}

