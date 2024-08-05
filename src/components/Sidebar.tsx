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
import { useRecoilState } from 'recoil';
import { sidebarOpen as sidebarOpenAtom } from '@/store/atoms/sidebar';
import { useEffect, useState } from 'react';
import { handleMarkAsCompleted } from '@/lib/utils';
import BookmarkButton from './bookmark/BookmarkButton';
import Link from 'next/link';
import { ArrowLeft, File, Video } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
      if (matchArray) {
        const urlPathString = matchArray[1];
        currentUrlContentId = Number(
          urlPathString.slice(urlPathString.length - 1),
        );
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
        return (
          <AccordionItem key={content.id} value={`item-${content.id}`}>
            <AccordionTrigger
              className={`flex w-full cursor-pointer gap-4 rounded-xl bg-foreground/10 p-4 hover:bg-foreground/15 hover:no-underline ${
                isActiveContent
                  ? 'text-bold bg-blue-600/80 text-white hover:bg-blue-600'
                  : ''
              }`}
            >
              <h3
                className={`line-clamp-1 capitalize tracking-tight text-foreground/80 ${
                  isActiveContent ? 'text-bold text-white' : ''
                }`}
              >
                {content.title}
              </h3>
            </AccordionTrigger>
            <AccordionContent className="m-0 p-0">
              {renderContent(content.children ?? [])}
            </AccordionContent>
          </AccordionItem>
        );
      }
      return (
        <Link
          key={content.id}
          href={navigateToContent(content.id) || '#'}
          className={`my-2 ml-auto line-clamp-1 flex max-w-[95%] cursor-pointer items-center rounded-xl bg-foreground/5 p-4 hover:bg-foreground/10 ${
            isActiveContent
              ? 'text-bold bg-blue-600/60 text-white hover:bg-blue-600/80'
              : ''
          }`}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex gap-4">
              {content.type === 'video' ? <Video className="size-5" /> : null}
              {content.type === 'notion' ? <File className="size-5" /> : null}

              <span
                className={`line-clamp-1 capitalize tracking-tight text-foreground/80 ${
                  isActiveContent ? 'text-bold text-white' : ''
                }`}
              >
                {content.title}
              </span>
            </div>
            {content.type === 'video' ? (
              <div className="flex items-center gap-2">
                <BookmarkButton
                  bookmark={content.bookmark ?? null}
                  contentId={content.id}
                />
                <Check content={content} />
              </div>
            ) : null}
          </div>
        </Link>
      );
    });
  };

  return (
    <AnimatePresence>
      {sidebarOpen && (
        <motion.div
          className="absolute top-16 z-[20] flex min-h-screen w-screen flex-col gap-4 overflow-y-scroll border-b border-r bg-background p-4 lg:sticky lg:w-[20vw]"
          style={{ height: 'calc(100vh - 64px)' }} // Adjust height to fit the screen excluding the navbar
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <h2 className="py-2 text-xl font-semibold tracking-tighter md:text-2xl">
            Course Content
          </h2>
          <Accordion
            type="single"
            collapsible
            className="flex w-full flex-col gap-4"
          >
            {renderContent(fullCourseContent)}
          </Accordion>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function ToggleButton({
  onClick,
  sidebarOpen,
}: {
  onClick: () => void;
  sidebarOpen: boolean;
}) {
  return (
    <Button
      onClick={onClick}
      variant="outline"
      className="flex size-8 flex-col items-center justify-center"
    >
      <span
        className={`block h-0.5 w-4 rounded-sm bg-foreground transition-all duration-300 ease-out ${!sidebarOpen ? 'translate-y-1 rotate-45' : '-translate-y-0.5'}`}
      ></span>
      <span
        className={`my-0.5 block h-0.5 w-4 rounded-sm bg-foreground transition-all duration-300 ease-out ${
          !sidebarOpen ? 'opacity-0' : 'opacity-100'
        }`}
      ></span>
      <span
        className={`block h-0.5 w-4 rounded-sm bg-foreground transition-all duration-300 ease-out ${
          !sidebarOpen ? '-translate-y-1 -rotate-45' : 'translate-y-0.5'
        }`}
      ></span>
    </Button>
  );
}

export function GoBackButton() {
  const router = useRouter();

  const goBack = () => {
    const pathSegments = window.location.pathname.split('/');

    pathSegments.pop();

    if (pathSegments.length <= 2) {
      router.push('/');
    } else {
      const newPath = pathSegments.join('/');
      router.push(newPath);
    }
  };

  return (
    <div className="text-foreground">
      <Button onClick={goBack} className="group" variant="default">
        <ArrowLeft className="size-5 text-white" />{' '}
        <span className="text-white">Back</span>
      </Button>
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
