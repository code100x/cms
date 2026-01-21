import React from 'react';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface Props {
  children: React.ReactNode;
}

export default async function MainLayout(props: Props) {
  const session = await getServerSession();

  if (!session?.user) {
    return redirect('/'); 
  }
  return <div className="w-full py-16">{props.children}</div>;
}
