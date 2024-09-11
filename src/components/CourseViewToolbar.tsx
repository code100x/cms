'use client';

import { FullCourseContent } from '@/db/course';
import BreadCrumbComponent from './BreadCrumbComponent';
import { Button } from './ui/button';
import { LuListVideo } from 'react-icons/lu';
import { useRecoilState } from 'recoil';
import { sidebarOpen as sidebarOpenAtom } from '@/store/atoms/sidebar';
import { useEffect, useState } from 'react';
import { WatchLaterPopup } from './watch-later/WatchLater';

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
    if (window.innerWidth < 500) {
      setShowButtonTitle(false);
    }
  }, []);

  return (
    <div className="flex w-full items-center justify-between">
      <BreadCrumbComponent {...courseData} />
      <div className="flex gap-3">
        <Button
          variant={'outline'}
          onClick={() => setSidebarOpen((show) => !show)}
        >
          <LuListVideo className="mr-2 text-lg" />
          {showButtonTitle && sidebarOpen ? 'Hide List' : 'Show List'}
        </Button>
        <WatchLaterPopup />
      </div>
    </div>
  );
};
