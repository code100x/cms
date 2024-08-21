'use client';

import { Course } from '@/store/atoms';
import { CourseCard } from './CourseCard';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { MenuOptionOpen as MenuOptionOpenAtom } from '@/store/atoms/MenuOption';

export const Courses = ({ courses }: { courses: Course[] }) => {
  const [setMenuOptionOpen] = useRecoilState(MenuOptionOpenAtom);
  const router = useRouter();
  return (
    <section className="flex flex-col pb-20">
      <div className="grid cursor-pointer grid-cols-1 gap-4 px-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {courses?.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            buttonColor=""
            roundedCardSize="2xl"
            onClick={() => {
              setMenuOptionOpen(false);
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
