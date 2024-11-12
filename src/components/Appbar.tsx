'use client';
import {
  Bookmark,
  MessageSquare,
  History,
  Home,
  SidebarOpen,
  SidebarClose,
} from 'lucide-react';
import { SidebarItems } from './ui/sidebar-items';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const menuOptions = [
  { id: 1, name: 'Home', Component: Home, href: '/home' },
  { id: 3, name: 'Bookmarks', Component: Bookmark, href: '/bookmark' },
  { id: 4, name: 'Questions', Component: MessageSquare, href: '/question' },
  { id: 5, name: 'Watch History', Component: History, href: '/watch-history' },
];

// Custom hook for media query
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addListener(listener);
    return () => media.removeListener(listener);
  }, [matches, query]);

  return matches;
};

export const Appbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const isMediumToXL = useMediaQuery(
    '(min-width: 768px) and (max-width: 1535px)',
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const sidebarVariants = {
    expanded: { width: '12vw' },
    collapsed: { width: '4vw' },
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav
        initial={false}
        animate={isMounted && (isCollapsed ? 'collapsed' : 'expanded')}
        variants={sidebarVariants}
        transition={{
          duration: 0.3,
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
        className="fixed left-0 top-0 z-[999] hidden h-full flex-col border-r border-primary/10 bg-background dark:bg-background 2xl:flex"
      >
        <div className="flex h-full flex-col gap-4">
          <div className="flex w-full items-center border-b border-primary/10 px-2 py-4">
            <div>
              <motion.button
                onClick={toggleCollapse}
                className="ml-auto flex items-center rounded-lg p-3 text-center transition-all duration-300 hover:bg-blue-600/5 hover:text-blue-500"
              >
                {isCollapsed ? <SidebarOpen /> : <SidebarClose />}
              </motion.button>
            </div>
            <div>
              {!isCollapsed && (
                <h3 className="text-xl font-bold tracking-tighter text-primary lg:text-2xl">
                  Menu
                </h3>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-8 p-2">
            <SidebarItems items={menuOptions} isCollapsed={isCollapsed} />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed bottom-0 left-0 right-0 z-[999] 2xl:hidden"
      >
        <div className="flex items-center justify-around border-t border-primary/10 bg-background p-4 shadow-xl">
          <SidebarItems items={menuOptions} isCollapsed={!isMediumToXL} />
        </div>
      </motion.nav>
    </>
  );
};
