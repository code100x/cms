import { refreshDb } from '@/actions/refresh-db';
import { Courses } from '@/components/Courses';
import { authOptions } from '@/lib/auth';
import { getPurchases } from '@/utiles/appx';
import { getServerSession } from 'next-auth';
import { Logout } from './Logout';
import { RefreshDb } from './RefreshDb';
import { Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';

const getCourses = async () => {
  const session = await getServerSession(authOptions);
  const purchases = await getPurchases(session?.user.email || '');

  return purchases;
};

const rs = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export const MyCourses = async () => {
  const res = await getCourses();
  if (res.type === 'error') {
    throw new Error('Ratelimited by appx please try again later');
  }

  const purchases = res.courses;

  if (!purchases?.length)
    return (
      <div>
        Sorry, no Courses found associated to your account. If you think this is
        a mistake, please mail at 100xdevs@gmail.com
        <br />
        Try logging in again -
        <Logout />
      </div>
    );
  return (
    <div className="w-full">
      <div className="flex w-full justify-between antialiased">
        <h1
          className={cn(
            'mb-2 text-2xl font-semibold text-neutral-800 dark:text-neutral-200 md:text-3xl',
            rs.className,
          )}
        >
          Courses
        </h1>
        <RefreshDb refreshDb={refreshDb} />
      </div>
      <Courses courses={purchases} />
    </div>
  );
};
