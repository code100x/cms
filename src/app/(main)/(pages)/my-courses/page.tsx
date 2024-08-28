import { refreshDb } from '@/actions/refresh-db';
import { MyCourses } from '@/components/MyCourses';
import { Redirect } from '@/components/Redirect';
import { RefreshDb } from '@/components/RefreshDb';
import { getServerSession } from 'next-auth';

export default async function MyCoursesPage() {
  const session = await getServerSession();

  if (!session?.user) {
    return <Redirect to={'/'} />;
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="mx-2 flex items-center justify-between">
        <h1 className="bg-background/6 top-0 flex items-center p-5 text-3xl backdrop-blur-lg">
          My Courses
        </h1>
        <RefreshDb refreshDb={refreshDb} />
      </div>
      <main className="no-scrollbar mb-10 flex h-full flex-col overflow-y-scroll text-lg">
        <MyCourses />
      </main>
    </div>
  );
}
