import React from 'react';
import { Appbar } from '@/components/Appbar';
import { SideNav } from '@/components/sidebar/sideNav';

interface Props {
  children: React.ReactNode;
}

export default (props: Props) => {
  return (
    <div className="flex min-h-screen flex-col">
      {/* <Sidebar /> */}
      <SideNav />
      <Appbar />
      <div className="mx-auto my-24 max-w-7xl px-4">{props.children}</div>
    </div>
  );
};
