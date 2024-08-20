'use client';

import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/sidebar/sidebar';
import React from 'react';
import { useSidebarToggle } from '@/hooks/useSidebarToggle';
import { useStore } from '@/hooks/useStore';

export const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)]transition-[margin-left] px-2 duration-300 ease-in-out md:px-4',
          sidebar?.isOpen === false ? 'lg:ml-[90px]' : 'lg:ml-72',
        )}
      >
        {children}
      </main>
    </>
  );
};
