import { MyCourses } from '@/components/MyCourses';

export default async function MyCoursesPage() {
  return (
    <div className="flex h-screen flex-col">
      <h1 className="bg-background/6 top-0 flex items-center p-5 text-3xl backdrop-blur-lg">
        My Courses
      </h1>
      <main className="no-scrollbar mb-10 flex h-full flex-col overflow-y-scroll text-lg">
        <MyCourses />
      </main>
    </div>
  );
}
