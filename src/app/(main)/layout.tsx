'use client';
import React, { useState } from 'react';
import { MenuOptions as Sidebar } from '@/components/sidebar/index';
import { Appbar } from '@/components/Appbar';

interface Props {
  children: React.ReactNode;
}

export default (props: Props) => {
  const [expanded, setExpanded] = useState(false);
  const toggleSideMenuBar = () => {
    setExpanded(!expanded);
  };
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar expanded={expanded} toggleSideMenuBar={toggleSideMenuBar} />
      <div className="w-full">
        <Appbar
          className="border-b p-4 pb-2"
          toggleSideMenuBar={toggleSideMenuBar}
        />
        {props.children}
      </div>
    </div>
  );
};
