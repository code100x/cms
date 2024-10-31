import { QueryParams } from '@/actions/types';
import { Sidebar } from '@/components/Sidebar';
import { getFullCourseContent } from '@/db/course';
import { authOptions } from '@/lib/auth';
import { getPurchases } from '@/utiles/appx';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

type CheckAccessReturn = 'yes' | 'no' | 'error';

const checkAccess = async (courseId: string): Promise<CheckAccessReturn> => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return 'no';
  }
  const response = await getPurchases(session.user.email);
  if (response.type === 'error') {
    return 'error';
  }
  const purchases = response.courses;
  if (purchases.map((p) => p.id).includes(Number(courseId))) {
    return 'yes';
  }
  return 'no';
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

  if (hasAccess === 'no') {
    redirect('/api/auth/signin');
  }

  if (hasAccess === 'error') {
    toast.error('Ratelimited by appx please try again later');
  }

  const fullCourseContent = await getFullCourseContent(parseInt(courseId, 10));

  return (
    <div className="relative flex min-h-screen flex-col pt-16 pb-20 2xl:pt-24 2xl:pb-0">
      <Sidebar fullCourseContent={fullCourseContent} courseId={courseId} />
      <div className="px-4 md:px-8 lg:px-12">
        {children}
      </div>
    </div>
  );
};

export default Layout;
