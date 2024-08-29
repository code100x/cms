'use client';

import { Course } from '@/store/atoms';
import { CourseCard } from './CourseCard';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { refreshDb } from '@/actions/refresh-db';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

export const Courses = ({ courses }: { courses: Course[] }) => {
  const session = useSession();

  const handleClick = async () => {
    // @ts-ignore
    const res = await refreshDb({ userId: session.data.user.id });
    if (res.error) {
      toast.error(res.message);
    } else {
      toast.info(res.message);
    }
  };
  const router = useRouter();
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {courses?.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          buttonColor=""
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
      <div className={`flex w-full max-w-md flex-col`}>
        <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
          <div className="flex flex-col items-center text-center">
            <h3 className="truncate text-xl font-bold capitalize tracking-tighter md:text-2xl">
              Don't see your courses?
            </h3>
            <p className="text-primary/80">
              Try refreshing the database if you are facing any issues, please
              contact us.
            </p>
          </div>
          <Button size={'lg'} onClick={handleClick}>
            Refresh
          </Button>
        </div>
      </div>
    </section>
  );
};
