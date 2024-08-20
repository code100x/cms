import React from 'react';
import { Appbar } from '@/components/Appbar';
import { SidebarLayout } from '@/components/sidebar/sidebar-layout';

interface Props {
  children: React.ReactNode;
}

export default (props: Props) => {
  return (
    <SidebarLayout>
      <Appbar className="border-b p-4 pb-2" />
      {props.children}
    </SidebarLayout>
  );
};
