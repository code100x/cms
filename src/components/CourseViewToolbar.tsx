'use client';

import { FullCourseContent } from '@/db/course';
import BreadCrumbComponent from './BreadCrumbComponent';
import { Button } from './ui/button';
import { LuListVideo } from 'react-icons/lu';
import { useRecoilState } from 'recoil';
import { sidebarOpen as sidebarOpenAtom } from '@/store/atoms/sidebar';
import { useEffect, useState } from 'react';

export const CourseViewToolbar = ({
  courseData,
}: {
  courseData: {
    course: any;
    contentType: any;
    courseContent: any;
    fullCourseContent: FullCourseContent[];
    rest: string[];
  };
}) => {
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom);
  const [showButtonTitle, setShowButtonTitle] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 500) {
        setShowButtonTitle(false);
      }
      if (window.innerWidth < 900) {
        // set sidebar open to false
        setSidebarOpen(false);
      }
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex w-full items-center justify-between">
      <BreadCrumbComponent {...courseData} />
      <Button
        variant={'outline'}
        onClick={() => setSidebarOpen((show) => !show)}
      >
        <LuListVideo className="mr-2 text-lg" />
        {showButtonTitle && sidebarOpen ? 'Hide List' : 'Show List'}
      </Button>
    </div>
  );
};
