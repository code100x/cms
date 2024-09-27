'use client';
import React, { useRef } from 'react';

import { X, Menu } from 'lucide-react';
import { FullCourseContent } from '@/db/course';
import { useRecoilState } from 'recoil';
import { sidebarOpen as sidebarOpenAtom } from '@/store/atoms/sidebar';
import { useEffect } from 'react';
import { Button } from '../../ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import CourseContentList from '../../helper/CourseContentList';

const sidebarVariants = {
  open: {
    width: '100%',
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  closed: {
    width: 0,
    opacity: 0,
    x: '100%',
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
};

export default function Sidebar({
  courseId,
  fullCourseContent,
}: {
  fullCourseContent: FullCourseContent[];
  courseId: number;
}) {
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom);

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const closeSidebar = () => setSidebarOpen(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarRef]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  return (
    <>
      <Button onClick={() => setSidebarOpen((s) => !s)} className="w-fit gap-2">
        {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        <span>{sidebarOpen ? 'Hide Contents' : 'Show Contents'}</span>
      </Button>
      {sidebarOpen && (
        <AnimatePresence>
          (
          <motion.div
            key="sidebar"
            initial="closed"
            animate="open"
            ref={sidebarRef}
            exit="closed"
            variants={sidebarVariants}
            className="fixed right-0 top-0 z-[99999] flex h-screen w-full flex-col gap-4 overflow-y-auto rounded-r-lg border-l border-primary/10 bg-neutral-50 dark:bg-neutral-900 md:max-w-[30vw]"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-primary/10 p-5 backdrop-blur-md">
              <h4 className="text-xl font-bold tracking-tighter text-primary lg:text-2xl">
                Course Content
              </h4>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="size-5" />
              </Button>
            </div>
            <CourseContentList
              courseId={courseId}
              fullCourseContent={fullCourseContent}
            />
          </motion.div>
          )
        </AnimatePresence>
      )}
    </>
  );
}
