'use client';
import { SessionProvider, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Redirect } from '@/components/Redirect';
import { Greeting } from '@/components/Greeting';

interface Props {
  children: React.ReactNode;
}

function FormatParam(param: string): string {
  return param.slice(0).split('-').join(' ');
}

function Layout({ children }: Props) {
  const { data: session, status } = useSession();
  const pathname = usePathname().split('/')[1];
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session?.user) {
    return <Redirect to={'/'} />;
  }

  return (
    <div className="w-full overscroll-none pt-16">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <h1 className="flex h-14 items-center text-wrap text-3xl font-extrabold capitalize tracking-tighter md:text-4xl">
          {pathname === 'home' ? (
            <Greeting name={session?.user?.name || ''} />
          ) : (
            FormatParam(pathname)
          )}
        </h1>
      </div>

      {children}
    </div>
  );
}

export default function MainLayout({ children }: Props) {
  return (
    <SessionProvider>
      <Layout>{children}</Layout>
    </SessionProvider>
  );
}
