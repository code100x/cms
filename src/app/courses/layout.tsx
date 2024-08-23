import React from 'react';
import MainLayout from '@/app/(main)/layout';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface Props {
  children: React.ReactNode;
}

type CheckAccessReturn = 'yes' | 'no';

const checkAccess = async (): Promise<CheckAccessReturn> => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return 'no';
  }

  return 'yes';
};

const CourseLayout = async (props: Props) => {
  const hasAccess = await checkAccess();

  if (hasAccess === 'no') {
    redirect('/api/auth/signin');
  }

  return <MainLayout>{props.children}</MainLayout>;
};

export default CourseLayout;
