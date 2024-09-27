import React from 'react';
import { getServerSession } from 'next-auth';
import { Redirect } from '@/components/helper/Redirect';

interface Props {
  children: React.ReactNode;
}

export default async function MainLayout(props: Props) {
  const session = await getServerSession();

  if (!session?.user) {
    return <Redirect to={'/'} />;
  }
  return <div className="w-full py-16">{props.children}</div>;
}
