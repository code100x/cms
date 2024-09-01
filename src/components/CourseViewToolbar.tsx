'use client';

import { FullCourseContent } from '@/db/course';
import BreadCrumbComponent from './BreadCrumbComponent';

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
  return (
    <div className="flex w-full items-center justify-between">
      <BreadCrumbComponent {...courseData} />
    </div>
  );
};
