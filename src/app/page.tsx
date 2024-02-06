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
  console.log('get user details start');
  const date = new Date();
  const session = await getServerSession(authOptions);
  console.log(
    `get user details end ${  (new Date().getTime() - date.getTime()) / 1000}`,
  );
  return session;
};

export default async function Home() {
  const session = await getUserDetails();

  if (session?.user) {
    return (
      <main className="max-w-screen-xl flex-col flex text-lg mx-auto pt-10 pb-6">
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
      </main>
    );
  }

  return (
    <main className="pt-36 pb-20">
      <LandingPage />
    </main>
  );
}
