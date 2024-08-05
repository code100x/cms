import { refreshDb } from '@/actions/refresh-db';
import { Courses } from '@/components/Courses';
import { authOptions } from '@/lib/auth';
import { getPurchases } from '@/utiles/appx';
import { getServerSession } from 'next-auth';
import { Logout } from './Logout';
import { RefreshDb } from './RefreshDb';

const getCourses = async () => {
  const session = await getServerSession(authOptions);
  const purchases = await getPurchases(session?.user.email || '');

  return purchases;
};

export const MyCourses = async () => {
  const purchases = await getCourses();
  if (!purchases.length)
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
    <div className="flex flex-col gap-8">
      <Courses courses={purchases} />
      <RefreshDb refreshDb={refreshDb} />
    </div>
  );
};
