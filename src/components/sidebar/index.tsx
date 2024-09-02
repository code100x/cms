'use client';
import { useEffect, useState } from 'react';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { signOut } from 'next-auth/react';
import { refreshDb } from '@/actions/refresh-db';

import Logo from '../landing/logo/logo';
import {
  Library,
  Bookmark,
  MessageSquare,
  History,
  PanelRightOpen,
  PanelLeftOpen,
  LogOut,
} from 'lucide-react';
import { RefreshDb } from '../RefreshDb';

export const menuOptions = [
  { id: 1, name: 'My Courses', Component: Library, href: '/my-courses' },
  { id: 3, name: 'Bookmarks', Component: Bookmark, href: '/bookmark' },
  { id: 4, name: 'Questions', Component: MessageSquare, href: '/question' },
  { id: 5, name: 'Watch History', Component: History, href: '/watch-history' },
];

export const MenuOptions = () => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 500) {
      setExpanded(false);
    }
  }, []);

  return (
    <aside className="h-screen">
      <nav
        className={`transition-width flex h-full flex-col border-r bg-white shadow-sm duration-300 dark:bg-[#020817] ${expanded ? 'w-64' : 'w-20'}`}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        {/* Header with logo and expand/collapse button */}
        <div className="flex items-center justify-between border-b p-4 pb-2">
          {expanded && (
            <div className="h-30 w-30">
              <Logo onFooter={false} />
            </div>
          )}
          <div className="cursor-pointer">
            <div className="p-2">
              {expanded ? (
                <PanelRightOpen size={24} />
              ) : (
                <PanelLeftOpen size={24} />
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 p-4">
          <AnimatedTooltip expanded={expanded} items={menuOptions} />
        </div>

        <RefreshDb refreshDb={refreshDb} expanded={expanded} />

        <div className="mt-4 border-t p-4">
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
        </div>
      </nav>
    </aside>
  );
};
