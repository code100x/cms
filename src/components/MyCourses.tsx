import { Courses } from '@/components/Courses';
import { authOptions } from '@/lib/auth';
import { getPurchases } from '@/utiles/appx';
import { getServerSession } from 'next-auth';
import { Logout } from './Logout';
import { RefreshDb } from '@/components/RefreshDb';
import { refreshDb } from '@/actions/refresh-db';

const getCourses = async () => {
  const session = await getServerSession(authOptions);
  const purchases = await getPurchases(session?.user.email || '');
  return purchases;
};

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
    <div className="">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="text-xl font-bold md:text-[32px]">My Courses</h1>
        <div>
          <RefreshDb refreshDb={refreshDb} />
        </div>
      </div>
      <Courses courses={purchases} />
    </div>
  );
};
