'use client';

import { Course } from '@/store/atoms';
import { CourseCard } from './CourseCard';

export const Courses = ({ courses }: { courses: Course[] }) => {
  return (
    <section className="flex flex-col pb-20">
      <div className="grid grid-cols-1 gap-4 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses?.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
};
