import React from 'react';
import db from '@repo/db';
import { SelectCourse } from '@/components/admin/SelectCourse';

async function getCourses() {
  const courses = db.course.findMany();
  return courses;
}

export default async function CourseContent() {
  const courses = await getCourses();
  return (
    <div className="mx-auto max-w-screen-xl cursor-pointer justify-between p-4">
      <SelectCourse courses={courses} />
    </div>
  );
}
