'use client';

import { Course } from '@/store/atoms';
import { CourseCard } from './CourseCard';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { refreshDb } from '@/actions/refresh-db';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Courses = ({ courses }: { courses: Course[] }) => {
  const [pinnedCourseIds, setPinnedCourseIds] = useState<number[]>([]);
  const session = useSession();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('pinnedCourses');
      setPinnedCourseIds(stored ? JSON.parse(stored) : []);
    }
  }, []);

  const togglePin = (courseId: number) => {
    if (typeof window === 'undefined') return;
    setPinnedCourseIds(prev => {
      const newPinned = prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId];
      localStorage.setItem('pinnedCourses', JSON.stringify(newPinned));
      return newPinned;
    });
  };

  const sortedCourses = [...courses].sort((a: Course, b: Course) : any => {
    if (!pinnedCourseIds) return;
    const aPinned = pinnedCourseIds.includes(a.id);
    const bPinned = pinnedCourseIds.includes(b.id);
    if (aPinned === bPinned) return 0;
    return -1;
  });

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
      {sortedCourses?.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          isPinned={pinnedCourseIds.includes(course.id)}
          onPinToggle={() => togglePin(course.id)}
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
      <div
        className={`flex w-full max-w-sm cursor-pointer flex-col items-center rounded-2xl bg-primary/5 p-16 transition-all duration-300 hover:-translate-y-2 hover:border-primary/20`}
      >
        <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
          <div className="flex flex-col items-center text-center">
            <h3 className="truncate text-xl font-bold capitalize tracking-tighter md:text-2xl">
              Don't see your courses?
            </h3>
            <p className="text-primary/80">
              Try refreshing the database. If you are still facing issues?{' '}
              <Link
                href="mailto:100xdevs@gmail.com"
                target="_blank"
                className="text-primary underline underline-offset-4"
              >
                Contact us
              </Link>
            </p>
          </div>
          <Button size={'lg'} onClick={handleClick}>
            Refresh Database
          </Button>
        </div>
      </div>
    </section>
  );
};
