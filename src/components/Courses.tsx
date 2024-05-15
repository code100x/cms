'use client';

import { Course } from '@/store/atoms';
import { CourseCard } from './CourseCard';
import Link from 'next/link';

export const Courses = ({ courses }: { courses: Course[] }) => {
  return (
    <section className="flex flex-col items-center w-full">
      <div className="max-w-screen-xl w-full mx-auto py-6 px-6 cursor-pointer grid grid-cols-1 gap-5 md:grid-cols-3 sm:grid-cols-2">
        {courses?.map((course) => (
          <Link
            href={
              course.title.includes('Machine Learning') ||
              course.title.includes('Harnoor')
                ? 'https://harkirat.classx.co.in/'
                : `/courses/${course.id}`
            }
          >
            <CourseCard
              key={course.id}
              course={course}
              buttonColor=""
              roundedCardSize="lg"
            />
          </Link>
        ))}
      </div>
    </section>
  );
};
