import Signin from '@/components/Signin';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/home');
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="w-full max-w-md">
        <Signin />
      </div>
    </div>
  );
}
