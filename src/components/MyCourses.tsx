import { Courses } from '@/components/Courses';
import { authOptions } from '@/lib/auth';
import { getPurchases } from '@/utiles/appx';
import { getServerSession } from 'next-auth';
import { Logout } from './Logout';

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
    <>
      <Courses courses={purchases} />
    </>
  );
};
