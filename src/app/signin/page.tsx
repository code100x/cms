import Signin from '@/components/Signin';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import React from 'react';

const SigninPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect('/my-course');
  }
  return <div className="flex items-center justify-center min-h-screen">
    <Signin />
  </div>

};

export default SigninPage;
