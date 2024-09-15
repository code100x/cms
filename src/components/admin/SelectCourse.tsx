'use client';
import { Course } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { CourseCard } from '../CourseCard';

export const SelectCourse = ({ courses }: { courses: Course[] }) => {
  const router = useRouter();

  return (
    <div className="grid cursor-pointer grid-cols-1 justify-between gap-4 md:grid-cols-3">
      {courses.map((course) => (
        <CourseCard
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
