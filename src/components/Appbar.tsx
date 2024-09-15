'use client';
import { Bookmark, MessageSquare, History, Home, X } from 'lucide-react';
import { AppbarItems } from './ui/appbar-items';
import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { appbarOpen as appbarOpenAtom } from '@/store/atoms/appbar';

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
  const [isAppbarOpen, setIsAppbarOpen] = useRecoilState(appbarOpenAtom);
  const isMediumToXL = useMediaQuery(
    '(min-width: 768px) and (max-width: 1535px)',
  );

  const toggleAppbar = () => setIsAppbarOpen((prev) => !prev);

  const appbarVariants = {
    open: {
      width: '100%',
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      },
    },
    closed: {
      width: '0',
      opacity: 0,
      x: '-100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      },
    },
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <AnimatePresence>
        <motion.nav
          initial="closed"
          animate={isAppbarOpen ? 'open' : 'closed'}
          exit="closed"
          variants={appbarVariants}
          className="fixed left-0 top-0 z-[999] hidden h-full flex-col border-r border-primary/10 bg-background dark:bg-background md:flex lg:max-w-[30vw]"
        >
          <div className="flex h-full flex-col gap-2">
            <div className="flex w-full items-center border-b border-primary/10 p-4">
              <h1 className="text-xl font-bold tracking-tighter">Menu</h1>
              <motion.button
                onClick={toggleAppbar}
                className="ml-auto flex items-center rounded-lg p-3 text-center transition-all duration-300 hover:bg-blue-600/5 hover:text-blue-500"
              >
                <X />
              </motion.button>
            </div>
            {isAppbarOpen && (
              <div className="flex flex-col gap-8 p-4">
                <AppbarItems items={menuOptions} isCollapsed={!isAppbarOpen} />
              </div>
            )}
          </div>
        </motion.nav>
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed bottom-0 left-0 right-0 z-[999] md:hidden"
      >
        <div className="flex items-center justify-around border-t border-primary/10 bg-background p-4 shadow-xl">
          <AppbarItems items={menuOptions} isCollapsed={!isMediumToXL} />
        </div>
      </motion.nav>
    </>
  );
};
