'use client';

import { CourseSkeleton } from '@/components/CourseCard';

export default function Loading() {
  return (
    <div className="max-w-screen-xl justify-between mx-auto p-4 cursor-pointer grid grid-cols-1 gap-5 md:grid-cols-3">
      {[1, 2, 3].map(() => (
        <CourseSkeleton />
      ))}
    </div>
  );
}
