import React from 'react';
import { SideNav } from '@/components/sidebar/sideNav';
import { Appbar } from '@/components/Appbar';

interface Props {
  children: React.ReactNode;
}

const CourseLayout = (props: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <SideNav />
      <Appbar />
      {props.children}
    </div>
  );
};

export default CourseLayout;
