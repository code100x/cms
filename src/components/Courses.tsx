'use client';

import { Course } from '@/store/atoms';
import { useRouter } from 'next/navigation';
import CourseCardV2 from './CourseCardV2';

export const Courses = ({ courses }: { courses: Course[] }) => {
  const router = useRouter();

  const handleCourseClick = (course: Course) => {
    if (
      course.title.includes('Machine Learning') ||
      course.title.includes('Harnoor')
    ) {
      router.push('https://harkirat.classx.co.in/');
    } else {
      router.push(`/courses/${course.id}`);
    }
  };

  return (
    <section className="flex w-full flex-col items-center">
      <div className="mx-auto grid w-full max-w-screen-xl cursor-pointer grid-cols-1 gap-5 px-6 py-6 sm:grid-cols-2 md:grid-cols-3">
        {courses?.map((course) => (
          <CourseCardV2
            course={course}
            key={course.id}
            onClick={() => handleCourseClick(course)}
          />
        ))}
      </div>
    </section>
  );
};
