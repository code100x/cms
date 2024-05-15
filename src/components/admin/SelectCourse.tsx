'use client';
import { Course } from '@prisma/client';
import { CourseCard } from '../CourseCard';
import Link from 'next/link';

export const SelectCourse = ({ courses }: { courses: Course[] }) => {
  return (
    <div className="max-w-screen-xl justify-between mx-auto p-4 cursor-pointer grid grid-cols-1 gap-5 md:grid-cols-3">
      {courses.map((course) => (
        <Link href={`/admin/content/${course.id}`}>
          <CourseCard course={course} key={course.id} />
        </Link>
      ))}
    </div>
  );
};
