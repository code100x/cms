import { refreshDb } from '@/actions/refresh-db';
import { Courses } from '@/components/Courses';
import { Logout } from './Logout';
import { RefreshDb } from './RefreshDb';

const getCourses = async () => {
  // TODO: Use auth
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/courses`,
  );
  const purchases = await response.json();
  return purchases.data;
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
    <>
      <Courses courses={purchases} />
      <RefreshDb refreshDb={refreshDb} />
    </>
  );
};
