import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import AdminSideBar from '@/components/admin/AdminSideBar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session || !session.user) {
    return redirect('/signin');
  }
  
  if (process.env.LOCAL_CMS_PROVIDER) {
    return (
      <div className="mt-[4.5rem] flex h-[calc(100vh-36px-4rem)] max-h-full">
          <div className='w-80 hidden md:flex h-full flex-col inset-y-0 bg-custom-light dark:bg-custom-dark-opacity'>
              <AdminSideBar />
          </div>
          <main className='h-full w-full overflow-y-auto'>
          {children}
        </main>
      </div>
    );
  }
  
  if (!process.env.ADMINS?.split(',').includes(session.user.email!)) {
    return notFound();
  }

  return (
    <div className="mt-[4.5rem] flex h-[calc(100vh-36px-4rem)] max-h-full">
        <div className='w-80 hidden md:flex h-full flex-col inset-y-0 bg-custom-light dark:bg-custom-dark-opacity'>
            <AdminSideBar />
        </div>
        <main className='h-full w-full overflow-y-auto'>
        {children}
      </main>
    </div>
  );
}
