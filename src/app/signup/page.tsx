import { SignupForm } from '@/components/Signup';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

const SigninPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/');
  }

  return <SignupForm />;
};

export default SigninPage;
