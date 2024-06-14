import { MyCourses } from '@/components/MyCourses';
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
      <main className="no-scrollbar mx-auto flex h-full max-w-screen-xl flex-col overflow-y-auto pb-6 pt-10 text-lg">
        <div className="max-w-2xl px-6 antialiased">
          <h1
            className={cn(
              'mb-2 text-2xl font-semibold text-neutral-800 dark:text-neutral-200 md:text-3xl',
              rs.className,
            )}
          >
            Courses
          </h1>
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
