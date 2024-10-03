'use client';
import { Appbar } from '@/components/Appbar';
import { sidebarState } from '@/store/atoms/sidebar';
import React from 'react';
import { useRecoilState } from 'recoil';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  const [isCollapsed, setIsCollapsed] = useRecoilState(sidebarState);

  return (
    <div className="flex min-h-screen">
      <Appbar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div
        className={`flex-grow transition-all duration-300 ${
          isCollapsed ? 'ml-[6vw]' : 'ml-[14vw]'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
