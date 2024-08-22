'use client';

import { Course } from '@/store/atoms';
import { CourseCard } from './CourseCard';
import { useRouter } from 'next/navigation';

export const Courses = ({ courses }: { courses: Course[] }) => {
  const router = useRouter();
  return (
    <section className="flex flex-col pb-20">
      <div className="grid cursor-pointer grid-cols-1 gap-4 px-6 md:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            buttonColor=""
            roundedCardSize="2xl"
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
