import db from '@/db';
import { Courses } from '@/components/Courses';

async function getCourses() {
  const courses = await db.course.findMany();
  return courses;
}

export default async function CoursesComponent() {
  const courses = await getCourses();
  return <Courses courses={courses} />;
}
