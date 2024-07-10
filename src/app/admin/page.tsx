'use client';

import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-screen-xl p-4 text-black dark:text-white">
      <h1 className="mb-8 text-center text-4xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div
          className="flex h-48 cursor-pointer items-center justify-center rounded-lg bg-blue-500 text-white shadow-lg transition-shadow duration-300 hover:shadow-2xl"
          onClick={() => router.push('/admin/add-course')}
        >
          <h2 className="text-2xl font-bold">Add Course</h2>
        </div>
        <div
          className="flex h-48 cursor-pointer items-center justify-center rounded-lg bg-green-500 text-white shadow-lg transition-shadow duration-300 hover:shadow-2xl"
          onClick={() => router.push('/admin/content')}
        >
          <h2 className="text-2xl font-bold">Add Content</h2>
        </div>
      </div>
    </div>
  );
}
