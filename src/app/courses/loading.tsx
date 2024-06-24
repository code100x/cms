'use client';

import { CourseSkeleton } from '@/components/CourseCard';

export default function Loading() {
  return (
    <div className="mx-auto grid max-w-screen-xl cursor-pointer grid-cols-1 justify-between gap-5 p-4 md:grid-cols-3">
      {[1, 2, 3].map((v) => (
        <CourseSkeleton key={v} />
      ))}
    </div>
  );
}
