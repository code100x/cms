'use client';

import {
  BookmarkIcon,
  FileStack,
  Files,
  HelpCircle,
  History,
  LogOut,
  MessageSquare,
} from 'lucide-react';
import {
  TbLayoutSidebarLeftCollapse,
  TbLayoutSidebarRightCollapse,
} from 'react-icons/tb';
import { signOut, useSession } from 'next-auth/react';

import Link from 'next/link';
import Logo from '../landing/logo/logo';
import { SidebarItem } from './SidebarItem';
import { useState } from 'react';

export const SIDEBAR_ITEMS = [
  { href: 'courses', icon: Files, title: 'My Courses' },
  { href: 'resources', icon: FileStack, title: 'Resources' },
  { href: 'bookmarks', icon: BookmarkIcon, title: 'Bookmarks' },
  { href: 'questions', icon: MessageSquare, title: 'Questions' },
  {
    href: 'history',
    icon: History,
    title: 'Watch History',
  },
];

export const HomeSidebar = () => {
  const { data } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed((collapsed) => !collapsed);
  };

  // sidebar will only be visible when user is signed in

  if (!data || !data.user) {
    return null;
  }

  return (
    <aside
      className={`flex h-screen w-[10%] flex-col gap-2 border-r duration-700 ${collapsed ? 'md:w-[5%]' : 'md:w-[20%]'}`}
    >
      <div
        className={`flex h-16 items-center justify-center border-b bg-background/80 md:justify-between ${collapsed ? 'md:justify-center' : ''} border-b px-2 text-neutral-700 shadow-sm backdrop-blur-md duration-700 dark:text-neutral-100 md:px-4`}
      >
        {!collapsed && (
          <div className="hidden overflow-clip md:block">
            <Logo onFooter={false} />
          </div>
        )}

        <TbLayoutSidebarRightCollapse
          onClick={toggleCollapse}
          className={`h-3 w-3 cursor-pointer duration-700 sm:h-4 sm:w-4 md:h-6 md:w-6 ${collapsed ? 'block' : 'hidden'}`}
        />
        <TbLayoutSidebarLeftCollapse
          onClick={toggleCollapse}
          className={`h-3 w-3 cursor-pointer duration-700 sm:h-4 sm:w-4 md:h-6 md:w-6 ${collapsed ? 'hidden' : 'block'}`}
        />
      </div>
      <nav className="flex h-[calc(100vh-64px)] flex-col border-r shadow-sm">
        <ul
          className={`flex flex-1 flex-col gap-2 px-3 md:gap-1 ${collapsed && 'md:gap-2'}`}
        >
          {SIDEBAR_ITEMS.map(({ href, icon, title }) => (
            <SidebarItem
              key={href}
              href={href}
              icon={icon}
              title={title}
              collapsed={collapsed}
            />
          ))}
        </ul>

        <div className="relative space-y-2 border-t border-border p-3">
          <Link
            href="/help-support"
            className={`flex w-full items-center rounded-md p-2 ${collapsed ? 'justify-center' : 'justify-start'}`}
          >
            <HelpCircle className="h-5 w-5 text-gray-500" />
            {!collapsed && (
              <span className="ml-3 hidden text-gray-500 md:block">
                Help & Support
              </span>
            )}
          </Link>
          <button
            onClick={() => signOut()}
            className={`flex w-full cursor-pointer items-center rounded-md bg-red-500/10 p-2 transition-colors ${collapsed ? 'justify-center' : 'justify-start'}`}
          >
            <LogOut className="h-5 w-5 text-red-500" />
            {!collapsed && (
              <span className="ml-3 hidden text-red-500 md:block">Logout</span>
            )}
          </button>
        </div>
      </nav>
    </aside>
  );
};
