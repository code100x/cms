import { Appbar } from '@/components/layout/Appbar';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export default (props: Props) => {
  return (
    <div className="flex min-h-screen w-full">
      <Appbar />
      <div className="wrapper w-full">{props.children}</div>
    </div>
  );
};
