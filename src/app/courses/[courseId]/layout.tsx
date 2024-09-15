import { QueryParams } from '@/actions/types';
import SearchBar from '@/components/search/SearchBar';
import { Sidebar } from '@/components/Sidebar';
import { getFullCourseContent, getCourse } from '@/db/course';
import { authOptions } from '@/lib/auth';
import { getPurchases } from '@/utiles/appx';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { Metadata, ResolvingMetadata } from 'next';

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
    toast.error('Rate Limited by AppX please try again later');
  }

  const fullCourseContent = await getFullCourseContent(parseInt(courseId, 10));

  return (
    <div className="relative flex min-h-screen flex-col gap-4 py-4">
      <div className="flex w-full flex-col justify-between gap-4 md:flex-row">
        <SearchBar />
        <Sidebar fullCourseContent={fullCourseContent} courseId={courseId} />
      </div>
      {children}
    </div>
  );
};

export default Layout;

export async function generateMetadata(
  { params }: { params: { courseId: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const courseId = parseInt(params.courseId, 10);
  const course = await getCourse(courseId);

  if (!course) {
    return {
      title: 'Course Not Found',
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${course.title} | 100xDevs`,
    description: course.description,
    openGraph: {
      title: `${course.title} | 100xDevs`,
      description: course.description,
      images: [course.imageUrl, ...previousImages],
    },
  };
}
