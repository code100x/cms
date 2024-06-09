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
    <div className="max-w-screen-xl justify-between mx-auto p-4 cursor-pointer">
      <SelectCourse courses={courses} />
    </div>
  );
}
