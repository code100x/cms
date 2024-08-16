'use client';
import { Course } from '@prisma/client';
import { useRouter } from 'next/navigation';
import CourseCardV2 from '../CourseCardV2';

export const SelectCourse = ({ courses }: { courses: Course[] }) => {
  const router = useRouter();

  const handleCourseClick = (course: Course) => {
    router.push(`/admin/content/${course.id}`);
  };

  return (
    <div className="mx-auto grid max-w-screen-xl cursor-pointer grid-cols-1 justify-between gap-5 p-4 md:grid-cols-3">
      {courses.map((course) => (
        <CourseCardV2
          course={course}
          onClick={() => handleCourseClick(course)}
          key={course.id}
        />
      ))}
    </div>
  );
};
