import { Appbar } from '@/components/Appbar';
import { Metadata } from 'next';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Courses',
};

const CourseLayout = (props: Props) => {
  return (
    <div className="mx-auto mb-16 flex min-h-screen w-full">
      <Appbar />
      <div className="wrapper w-full">{props.children}</div>
    </div>
  );
};

export default CourseLayout;
