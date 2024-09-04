'use client';
import { Course } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { CourseCard } from '../CourseCard';

export const SelectCourse = ({ courses }: { courses: Course[] }) => {
  const router = useRouter();

  return (
    <div className="mx-auto grid max-w-screen-xl cursor-pointer grid-cols-1 justify-between gap-5 p-4 md:grid-cols-3">
      {courses.map((course) => (
        <CourseCard
          buttonColor=""
          //@ts-ignore
          course={course}
          onClick={() => {
            router.push(`/admin/content/${course.id}`);
          }}
          key={course.id}
        />
      ))}
    </div>
  );
};
