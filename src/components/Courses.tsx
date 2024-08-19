'use client';

import { Course } from '@/store/atoms';
import { CourseCard } from './CourseCard';
import { useRouter } from 'next/navigation';

export const Courses = ({ courses }: { courses: Course[] }) => {
  const router = useRouter();
  return (
    <section className="flex w-full flex-col items-center">
      <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-5 p-4 sm:grid-cols-2 md:grid-cols-3 md:p-6">
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
