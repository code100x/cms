import { Appbar } from '@/components/Appbar';
import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';
import React from 'react';

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
      <div className="flex min-h-screen w-full py-4">
        <Appbar />
        {children}
      </div>
    );
  }

  if (!process.env.ADMINS?.split(',').includes(session.user.email!)) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen w-full py-4">
      <Appbar />
      {children}
    </div>
  );
}
