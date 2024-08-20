'use client';
import { useState } from 'react';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { signOut } from 'next-auth/react';

import Logo from '../landing/logo/logo';
import {
  Library,
  Bookmark,
  MessageSquare,
  History,
  PanelRightOpen,
  LogOut,
} from 'lucide-react';

export const menuOptions = [
  { id: 1, name: 'My Courses', Component: Library, href: '/my-courses' },
  { id: 3, name: 'Bookmarks', Component: Bookmark, href: '/bookmark' },
  { id: 4, name: 'Questions', Component: MessageSquare, href: '/question' },
  { id: 5, name: 'Watch History', Component: History, href: '/watch-history' },
];

export const MenuOptions = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="flex h-full flex-col border-r bg-white shadow-sm dark:bg-[#020817]">
        {/* Header with logo and expand/collapse button */}
        <div className="flex items-center justify-between border-b p-4 pb-2">
          {expanded && (
            <div className="h-30 w-30">
              <Logo onFooter={false} />
            </div>
          )}
          <div
            className="cursor-pointer"
            onClick={() => setExpanded((curr) => !curr)}
          >
            <div className="p-2">
              <PanelRightOpen size={24} />
            </div>
          </div>
        </div>

        <div className="boarder border-gray flex flex-1 flex-col gap-6 p-4">
          <AnimatedTooltip expanded={expanded} items={menuOptions} />
        </div>

        {/* <div className="border-t p-4">
          <div className="flex rounded-md p-2">
          <LogOut size={24} color="#DD503F" />
            <button
              onClick={() => {
                signOut();
              }}
              className={`flex items-center justify-between overflow-hidden transition-all ${
                expanded ? 'ml-3 w-52' : 'w-0'
              }`}
            >
               
              <h4 className="font-semibold text-[#DD503F]">Logout</h4>
            </button>
          </div>
        </div> */}

        <div className="border-t p-4">
          <div className="flex rounded-md p-2">
            <button
              onClick={() => {
                signOut();
              }}
              className={`flex items-center transition-all ${expanded ? 'ml-3 w-52' : 'w-auto'}`}
            >
              <LogOut size={24} color="#DD503F" />
              {expanded && (
                <h4 className="ml-3 font-semibold text-[#DD503F]">Logout</h4>
              )}
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
};

/* export const MenuOptions = () => {
  return <nav className="dark:bg-[#020817] border-r-2 border-gray-700/50 h-screen w-72 overflow-hide justify-between flex items-center flex-col  gap-10 py-6 px-2">
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-row items-center gap-8">
        <Logo onFooter={false} />
        <div onClick={() => { }}>
          <TbLayoutSidebarRightExpand size={22} color="white" />
        </div>
      </div>
      <AnimatedTooltip items={menuOptions} />
    </div>
  </nav>
} */
