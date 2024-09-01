import React from 'react';
import MainLayout from '@/app/(main)/layout';

interface Props {
  children: React.ReactNode;
}

const QuestionsLayout = (props: Props) => {
  return <MainLayout>{props.children}</MainLayout>;
};

export default QuestionsLayout;
