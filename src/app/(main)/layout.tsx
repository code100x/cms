import React from 'react';
import { Appbar } from '@/components/Appbar';
import { Navbar } from '@/components/sidebar/navbar';

interface Props {
  children: React.ReactNode;
}

export default (props: Props) => {
  return (
    <div className="flex min-h-screen w-full flex-col">
      {/* <Sidebar /> */}
      <Navbar />
      <Appbar />
      <div className="wrapper my-24 w-full">{props.children}</div>
    </div>
  );
};
