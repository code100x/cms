import React from 'react';
import { MenuOptions as Sidebar } from '@/components/sidebar/index';
import { Appbar } from '@/components/Appbar';

interface Props {
  children: React.ReactNode;
}

export default (props: Props) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="w-full">
        <Appbar className="border-b p-4 pb-2" />
        {props.children}
      </div>
    </div>
  );
};
