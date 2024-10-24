'use client';
import React from 'react';
import { Layout, Home, Calendar, Book, Radio } from 'lucide-react';
import SideBarItems from './SideBarItems';

const routes = [
  {
    icon: Home,
    label: 'Home',
    href: '/admin',
  },
  {
    icon: Layout,
    label: 'Manage',
    href: '/admin/course',
  },
  {
    icon: Radio,
    label: 'Schedule',
    href: '/admin/schedule',
  },
  {
    icon: Calendar,
    label: 'Calendar',
    href: '/admin/calendar',
  },
  {
    icon: Book,
    label: 'Assignment',
    href: '/admin/assignment',
  },
];

const AdminSideBar = ({isCollapsed}:{isCollapsed?: boolean}) => {
  return (
    <div className="overlfow-y-auto flex min-h-screen flex-col border-r pt-4 shadow-sm">
      <div className="flex w-full flex-col">
        {routes.map((route) => {
          return (
            <SideBarItems
              key={route.href}
              label={route.label}
              href={route.href}
              icon={route.icon}
              isCollapsed={isCollapsed}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminSideBar;
