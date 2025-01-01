import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import AdminSideBarWithToggle from '@/components/admin/AdminSideBarWithToggle';

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
      <div className="mt-[4.5rem] flex max-h-full min-h-screen">
          <AdminSideBarWithToggle />
        <main className="min-h-screen w-full overflow-y-auto">{children}</main>
      </div>
    );
  }

  if (!process.env.ADMINS?.split(',').includes(session.user.email!)) {
    return notFound();
  }

  return (
    <div className="mt-[4.5rem] flex h-[calc(100vh-36px-4rem)] max-h-full">
      <AdminSideBarWithToggle />
      <main className="min-h-screen w-full overflow-y-auto">{children}</main>
    </div>
  );
}
