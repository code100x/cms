import { Courses } from '@/components/Courses';
import { authOptions } from '@/lib/auth';
import { getPurchases } from '@/utiles/appx';
import { getServerSession } from 'next-auth';
import { Logout } from './Logout';
import { Course } from '@prisma/client';
const getCourses = async () => {
  const session = await getServerSession(authOptions);
  // TODO: Hack might give error
  const purchases = (await getPurchases(session?.user.email || '')) as Course[];

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
  return <Courses courses={purchases} />;
};
