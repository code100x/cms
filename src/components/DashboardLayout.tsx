'use client';

import { sidebarOpen } from '@/store/atoms/sidebar';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { Sidebar } from './NewSidebar';
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: Session } = useSession();
  const isSidebarOpen = useRecoilValue(sidebarOpen);
  if (Session?.user)
    return (
      <div>
        <div className={Session?.user ? '' : 'hidden'}>
          <Sidebar />
        </div>
        <main
          className={cn(
            'min-h-[calc(100vh_-_56px)] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900',
            isSidebarOpen === false ? 'lg:ml-[62px]' : 'lg:ml-60',
          )}
        >
          {children}
        </main>
      </div>
    );
  return <>{children}</>;
}
