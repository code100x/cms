'use client';
import { Course } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { CourseCard } from '../CourseCard';

export const SelectCourse = ({ courses }: { courses: Course[] }) => {
  const router = useRouter();

  return (
    <div className="max-w-screen-xl justify-between mx-auto p-4 cursor-pointer grid grid-cols-1 gap-5 md:grid-cols-3">
      {courses.map((course) => (
        <CourseCard
          buttonColor=""
          roundedCardSize="lg"
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
