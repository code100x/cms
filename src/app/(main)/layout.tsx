import React from 'react';
import { Appbar } from '@/components/Appbar';
import SideBar from '@/components/sideBar';

interface Props {
  children: React.ReactNode;
}

export default (props: Props) => {
  return (
    <div className="flex h-screen overflow-hidden">
      {
        <div className="flex w-full gap-0">
          <SideBar />
          <div className="ml-[5.1rem] flex h-screen w-full flex-col overflow-hidden lg:ml-0">
            <Appbar />
            {props.children}
          </div>
        </div>
      }
    </div>
  );
};
