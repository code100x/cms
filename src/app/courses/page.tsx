import db from '@/db';
import { Courses } from '@/components/Courses';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

async function getCourses() {
  const courses = db.course.findMany();
  return courses;
}
const getUserDetails = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export default async function CoursesComponent() {
  const courses = await getCourses();
  const session = await getUserDetails();

  if (session?.user) {
    redirect('/home');
  }

  return <Courses courses={courses} />;
}
