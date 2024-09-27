import { Appbar } from '@/components/layout/Appbar';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const CourseLayout = (props: Props) => {
  return (
    <div className="flex min-h-screen">
      <Appbar />
      <div className="wrapper w-full">{props.children}</div>
    </div>
  );
};

export default CourseLayout;
