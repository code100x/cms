import React from 'react';
import db from '@/db';
import { SelectCourse } from '@/components/admin/SelectCourse';

async function getCourses() {
  const courses = db.course.findMany();
  return courses;
}

export default async function CourseContent() {
  const courses = await getCourses();
  return (
    <div className="wrapper flex flex-col gap-8">
      <h1 className="text-3xl font-bold capitalize md:text-4xl">
        Content Management
      </h1>
      <SelectCourse courses={courses} />
    </div>
  );
}
