'use client';

import { sidebarOpen } from '@/store/atoms/sidebar';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { Sidebar } from './sidebar/Sidebar';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';
import Footer from './landing/footer/footer';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: Session } = useSession();
  const isSidebarOpen = useRecoilValue(sidebarOpen);
  if (Session?.user)
    return (
      <div className="flex">
        <div className={Session?.user ? '' : 'hidden'}>
          <Sidebar />
        </div>
        <main
          className={cn(
            'w-full transition-[margin-left] duration-300 ease-in-out',
            isSidebarOpen === false ? 'lg:ml-[60px]' : 'lg:ml-60',
          )}
        >
          {children}
        </main>
      </div>
    );
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
