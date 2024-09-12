import { Greeting } from '@/components/Greeting';
import { MyCourses } from '@/components/MyCourses';
import { Redirect } from '@/components/Redirect';
import SearchBar from '@/components/search/SearchBar';
import { getServerSession } from 'next-auth';

export default async function MyCoursesPage() {
  const session = await getServerSession();

  if (!session?.user) {
    return <Redirect to={'/'} />;
  }

  return (
    <main className="flex flex-col gap-4 pb-16 pt-8">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <h1 className="text-wrap text-3xl font-extrabold capitalize tracking-tighter md:text-4xl">
          <Greeting /> {session.user.name}
        </h1>
        <SearchBar />
      </div>

      <div className="flex h-full flex-col gap-4 rounded-2xl py-4">
        <MyCourses />
      </div>
    </main>
  );
}
