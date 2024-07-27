import { QueryParams } from '@/actions/types';
import { Sidebar } from '@/components/Sidebar';
import { getFullCourseContent } from '@/db/course';
import { authOptions } from '@/lib/auth';
import { getPurchases } from '@/utiles/appx';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

// interface PurchaseType {
//   id: number;
//   title: string;
//   imageUrl: string;
//   description: string;
//   appxCourseId: number;
//   openToEveryone: boolean;
//   slug: string;
//   discordRoleId: string;
//   totalVideos?: number;
//   totalVideosWatched: number;
// }
const checkAccess = async (courseId: string) => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return false;
  }
  const purchases = await getPurchases(session.user.email);
  if (purchases.map((p) => p.id).includes(Number(courseId))) {
    return true;
  }
  return false;
};

const Layout = async ({
  params,
  children,
}: {
  params: { courseId: string };
  searchParams: QueryParams;
  children: any;
}) => {
  const courseId = params.courseId;
  const hasAccess = await checkAccess(courseId);

  if (!hasAccess) {
    redirect('/api/auth/signin');
  }

  const fullCourseContent = await getFullCourseContent(parseInt(courseId, 10));

  return (
    <div className="flex h-full">
      <Sidebar fullCourseContent={fullCourseContent} courseId={courseId[0]} />
      <div className="grow p-2 overflow-y-auto no-scrollbar">{children}</div>
    </div>
  );
};

export default Layout;
