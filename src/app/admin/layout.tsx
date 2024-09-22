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
    return <div className="my-[6rem] max-h-full h-[calc(100vh-36px-4rem)]">{children}</div>;
  }

  if (!process.env.ADMINS?.split(',').includes(session.user.email!)) {
    return notFound();
  }

  return <div className="flex mt-[6rem] max-h-full h-[calc(100vh-36px-4rem)]">{children}</div>;
}
