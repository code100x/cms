import React from 'react';
import { Appbar } from '@/components/Appbar';
import { Navbar } from '@/components/sidebar/navbar';

interface Props {
  children: React.ReactNode;
}

const CourseLayout = (props: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <Appbar />
      {props.children}
    </div>
  );
};

export default CourseLayout;
