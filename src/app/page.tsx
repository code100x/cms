import { MyCourses } from '@/components/MyCourses';
import LandingPage from '@/components/landing/landing-page';
import { Spotlight } from '@/components/landing/spotlight';
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
      <main className="wrapper my-16 flex h-full min-h-screen flex-col gap-8 text-lg antialiased">
        <Spotlight
          className="-top-40 left-0 -z-[99] md:-top-20 md:left-60"
          fill="blue"
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <h1
            className={cn(
              'text-4xl font-bold capitalize tracking-tighter text-foreground md:text-5xl',
              rs.className,
            )}
          >
            Welcome {session.user?.name}!
          </h1>
          <span className="text-xl tracking-tight text-foreground/80 md:text-2xl">
            Explore Your Courses
          </span>
        </div>
        <MyCourses />
      </main>
    );
  }

  return (
    <main className="py-20">
      <LandingPage />
    </main>
  );
}
