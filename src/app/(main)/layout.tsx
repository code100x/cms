import { Appbar } from '@/components/Appbar';
import React from 'react';
import { Metadata } from 'next';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'App | 100xDevs',
};

export default (props: Props) => {
  return (
    <div className="flex min-h-screen w-full">
      <Appbar />
      <div className="wrapper w-full">{props.children}</div>
    </div>
  );
};
