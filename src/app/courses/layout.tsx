'use client';
import { Appbar } from '@/components/Appbar';
import { isSideBarCollapsed } from '@/store/atoms/isSideBarCollabsed';
import React from 'react';
import { useRecoilValue } from 'recoil';

interface Props {
  children: React.ReactNode;
}

const CourseLayout = (props: Props) => {
  const isCollapsed=useRecoilValue(isSideBarCollapsed);
  return (
    <div className="flex min-h-screen">
      <Appbar />
      <div className={`flex-1 transition-all duration-300 ${
          isCollapsed ? 'ml-[5vw]' : 'ml-[21vw]'
        }`}
      >
        {props.children}</div>
    </div>
  );
};

export default CourseLayout;
