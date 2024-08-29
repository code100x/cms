import { MyCourses } from '@/components/MyCourses';
import { Redirect } from '@/components/Redirect';
import { getServerSession } from 'next-auth';

export default async function MyCoursesPage() {
  const session = await getServerSession();

  if (!session?.user) {
    return <Redirect to="/" />;
  }

  // Get the current hour
  const currentHour = new Date().getHours();

  // Determine the appropriate greeting based on the time of day
  let greeting = 'Good Morning';
  if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Good Afternoon';
  } else if (currentHour >= 18 || currentHour < 5) {
    greeting = 'Good Evening';
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <h1 className="text-3xl font-bold capitalize tracking-tighter md:text-4xl">
        {greeting} {session.user.name},
      </h1>

      <MyCourses />
    </div>
  );
}
