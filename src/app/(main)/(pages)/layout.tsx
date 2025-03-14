import Heading from '@/components/Heading';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session?.user) {
    redirect('/');
  }

  return (
    <div className="w-full overscroll-none pt-16 md:pt-24">
      <Heading name={session.user.name || ''} />
      {children}
    </div>
  );
}
