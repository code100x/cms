import { MyCourses } from '@/components/MyCourses';
import { Redirect } from '@/components/Redirect';
import { getServerSession } from 'next-auth';

export default async function MyCoursesPage() {
  const session = await getServerSession();

  if (!session?.user) {
    return <Redirect to={'/'} />;
  }

  return (
    <main className="flex flex-col gap-4">
      <div className="no-scrollbar flex h-full max-h-[calc(100dvh-10rem)] flex-col gap-4 overflow-y-scroll rounded-2xl py-4 pb-24 lg:pb-4">
        <MyCourses />
      </div>
    </main>
  );
}
