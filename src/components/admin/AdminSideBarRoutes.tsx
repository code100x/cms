'use client';
import { Layout, Home, Calendar, Book, Radio } from 'lucide-react';
import React from 'react';
import SideBarItems from './SideBarItems';

const routes = [
    {
        icon: Home,
        label: 'Home',
        href: '/admin'
    },
    {
        icon: Layout,
        label: 'Manage',
        href: '/admin/course'
    },
    {
        icon: Radio,
        label: 'Schedule Class',
        href: '/admin/schedule'
    },
    {
        icon: Calendar,
        label: 'Calendar',
        href: '/admin/calendar'
    },
    {
        icon: Book,
        label: 'Assignment',
        href: '/admin/assignment'
    },
];

const AdminSideBarRoutes = () => {
  return (
    <div className='flex flex-col w-full'>
        {routes.map((route) => {
            return (
                <SideBarItems key={route.href} label={route.label} href={route.href} icon={route.icon} />
            );
        })}
    </div>
  );
};

export default AdminSideBarRoutes;