'use client';
import { Bookmark, MessageSquare, History, Home } from 'lucide-react';
import { SidebarItems } from '../ui/sidebar-items';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import ProfileDropdown from '../profile-menu/ProfileDropdown';
import { motion } from 'framer-motion';

export const menuOptions = [
  { id: 2, name: 'Bookmarks', Component: Bookmark, href: '/bookmarks' },
  { id: 3, name: 'Questions', Component: MessageSquare, href: '/questions' },
  { id: 1, name: 'Home', Component: Home, href: '/home' },
  { id: 4, name: 'History', Component: History, href: '/watch-history' },
];

export const SideNav = () => {
  return (
    <div className="fixed bottom-0 left-0 z-[9999] w-full p-4">
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
          type: 'spring',
          damping: 10,
        }}
        className={`mx-auto flex w-fit justify-between gap-2 rounded-xl bg-neutral-50 p-2 shadow-[0_35px_48px_-16px_rgba(0,0,0,0.3)] dark:bg-neutral-900`}
      >
        <SidebarItems items={menuOptions} />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {/* <div
                onClick={() => {
                  signOut();
                }}
                className={`flex cursor-pointer flex-row items-center gap-2 rounded-xl p-4 text-red-600 transition-all duration-300 hover:bg-red-600/10`}
              >
                <LogOut />
              </div> */}
              <ProfileDropdown />
            </TooltipTrigger>
            <TooltipContent side="top" sideOffset={2}>
              <p>Account</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </motion.nav>
    </div>
  );
};
