import { refreshDb } from '@/actions/refresh-db';
import { MyCourses } from '@/components/MyCourses';
import { RefreshDb } from '@/components/RefreshDb';
import LandingPage from '@/components/landing/landing-page';
import { authOptions } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { getServerSession } from 'next-auth';
import { Poppins } from 'next/font/google';

const rs = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

const getUserDetails = async () => {
  // console.log('get user details start');
  // const date = new Date();
  const session = await getServerSession(authOptions);
  // console.log(
  //   `get user details end ${  (new Date().getTime() - date.getTime()) / 1000}`,
  // );
  return session;
};

export default async function Home() {
  const session = await getUserDetails();

  if (session?.user) {
    return (
      <main className="no-scrollbar p-4 mx-auto flex h-full max-w-screen-xl flex-col overflow-y-auto text-lg">
        <div className="w-full flex items-center justify-between antialiased">
          <h1
            className={cn(
              'mb-2 text-2xl font-semibold text-neutral-800 dark:text-neutral-200 md:text-3xl',
              rs.className,
            )}
          >
            My Courses
          </h1>
          <RefreshDb refreshDb={refreshDb} />
        </div>

        <MyCourses />
      </main>
    );
  }

  return (
    <main className="pb-20 pt-36">
      <LandingPage />
    </main>
  );
}
