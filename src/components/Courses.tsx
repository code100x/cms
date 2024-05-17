'use client';

import { Course } from '@/store/atoms';
import { CourseCard } from './CourseCard';
import { useRouter } from 'next/navigation';

export const Courses = ({ courses }: { courses: Course[] }) => {
  const router = useRouter();
  return (
    <section className="flex flex-col items-center w-full">
      <div className="max-w-screen-xl w-full mx-auto py-6 px-6 cursor-pointer grid grid-cols-1 gap-5 md:grid-cols-3 sm:grid-cols-2">
        {courses?.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            buttonColor=""
            roundedCardSize="lg"
            onClick={() => {
              if (
                course.title.includes('Machine Learning') ||
                course.title.includes('Harnoor')
              ) {
                router.push('https://harkirat.classx.co.in/');
              } else {
                router.push(`/courses/${course.id}`);
              }
            }}
          />
        ))}
      </div>
    </section>
  );
};
