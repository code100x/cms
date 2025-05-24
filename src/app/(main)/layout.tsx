"use client";
import { Appbar } from '@/components/Appbar';
import { useRecoilValue } from 'recoil';
import { isSideBarCollapsed } from '@/store/atoms/isSideBarCollabsed';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default function Layout({children}: Props) {
  const isCollapsed=useRecoilValue(isSideBarCollapsed);
  return (
    <div className="flex min-h-screen w-full">
      <Appbar />
      <main
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? 'ml-[5vw]' : 'ml-[21vw]'
        }`}
      >
        {children}
      </main>
    </div>
  );
}
