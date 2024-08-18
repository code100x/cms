import React from 'react';
import MainLayout from '@/app/(main)/layout';

interface Props {
  children: React.ReactNode;
}

const CourseLayout = (props: Props) => {
  return <MainLayout>{props.children}</MainLayout>;
};

export default CourseLayout;
