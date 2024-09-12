
import { MyCourses } from '@/components/MyCourses';
import HelpIcon from '@/components/helpSection/helpIcon';

import LandingPage from '@/components/landing/landing-page';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

const getUserDetails = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export default async function Home() {
  const session = await getUserDetails();

  if (session?.user) {

    return (
      <main className="max-w-screen-xl flex-col flex text-lg mx-auto pt-10 pb-6 h-full overflow-y-auto no-scrollbar">
        <div className="px-6 max-w-2xl antialiased">
          <h1
            className={cn(
              'text-2xl font-semibold text-neutral-800 dark:text-neutral-200 md:text-3xl mb-2',
              rs.className,
            )}
          >
            Courses
          </h1>
        </div>

        <MyCourses />
        <HelpIcon />
      </main>
    );

    redirect('/home');

  }

  return (
    <main>
      <LandingPage />
    </main>
  );
}
