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

  if (!process.env.ADMINS?.split(',').includes(session.user.email!)) {
    return notFound();
  }

  return <>{children}</>;
}
