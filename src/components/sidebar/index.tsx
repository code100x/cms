'use client';
import { useState } from 'react';
import { signOut } from 'next-auth/react';
import {
  Bookmark,
  MessageSquare,
  History,
  LogOut,
  ChevronsRight,
  ChevronsLeft,
  Home,
} from 'lucide-react';
import { SidebarItems } from '../ui/sidebar-items';
import Link from 'next/link';

export const menuOptions = [
  { id: 1, name: 'Home', Component: Home, href: '/home' },
  { id: 3, name: 'Bookmarks', Component: Bookmark, href: '/bookmark' },
  { id: 4, name: 'Questions', Component: MessageSquare, href: '/question' },
  { id: 5, name: 'Watch History', Component: History, href: '/watch-history' },
];

export const MenuOptions = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="h-screen">
      <nav
        className={`flex h-full flex-col justify-between gap-4 border-r p-4 ${expanded ? 'w-72' : ''}`}
      >
        <div className="flex h-full w-full flex-col gap-4">
          <div
            className={`flex w-full ${expanded ? '' : 'flex-col'} items-center justify-between gap-2`}
          >
            <Link href={'/'} className="flex w-full items-center">
              <img
                src={
                  'https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg'
                }
                className={`size-12 rounded-full ${expanded ? '' : 'mx-auto'}`}
              />
            </Link>{' '}
            <div
              className={`hidden cursor-pointer flex-row items-center gap-2 rounded-xl p-4 transition-all duration-300 hover:bg-primary/10 md:flex`}
              onClick={() => setExpanded((curr) => !curr)}
            >
              {expanded ? <ChevronsLeft /> : <ChevronsRight />}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <SidebarItems items={menuOptions} />
          </div>
        </div>

        <div
          className={`flex cursor-pointer flex-row items-center gap-2 rounded-xl p-4 text-red-600 transition-all duration-300 hover:bg-red-600/10`}
        >
          <div
            onClick={() => {
              signOut();
            }}
            className={`flex items-center justify-between overflow-hidden transition-all`}
          >
            <LogOut />
            {expanded && <h4 className="ml-2 font-semibold">Logout</h4>}
          </div>
        </div>
      </nav>
    </aside>
  );
};
