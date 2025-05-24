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
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { isSideBarCollapsed } from '@/store/atoms/isSideBarCollabsed';
import { useRecoilState } from 'recoil';

export const menuOptions = [
  { id: 1, name: 'Home', Component: Home, href: '/home' },
  { id: 3, name: 'Bookmarks', Component: Bookmark, href: '/bookmark' },
  { id: 4, name: 'Questions', Component: MessageSquare, href: '/question' },
  { id: 5, name: 'Watch History', Component: History, href: '/watch-history' },
];

//Added Eventlistener 
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

    // Use addEventListener instead of addListener
    media.addEventListener("change", listener);
    
    // Set the initial match state
    setMatches(media.matches);

    // Cleanup function to remove the event listener
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
};

export default useMediaQuery;

export const Appbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isSidebarCollapsed,setIsSidebarCollapsed] = useRecoilState(isSideBarCollapsed);
  setIsSidebarCollapsed(isCollapsed); 
  const [isMounted, setIsMounted] = useState(false);
  const isMediumToXL = useMediaQuery(
    '(min-width: 768px) and (max-width: 1535px)',
  );
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsCollapsed(true);
        setIsSidebarCollapsed(true);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };   
  }, []);

  const toggleCollapse = () =>{
     setIsCollapsed(!isCollapsed);
     setIsSidebarCollapsed(!isSidebarCollapsed);
    }

  const sidebarVariants = {
    expanded: { width: '20vw' },
    collapsed: { width: '4vw' },
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.nav
        ref={sidebarRef}
        initial={false}
        animate={isMounted && (isCollapsed ? 'collapsed' : 'expanded')}
        variants={sidebarVariants}
        transition={{
          duration: 0.3,
          type: 'spring',
          stiffness: 200,
          damping: 20,
        }}
        className="fixed left-0 top-0 z-[999] hidden h-full flex-col border-r border-primary/10 bg-background dark:bg-background lg:flex min-w-16"
      >
        <div className="flex h-full flex-col gap-4">
          <div className="flex w-full items-center border-b border-primary/10 px-2 py-3">
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
            <SidebarItems items={menuOptions} isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed}/>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed bottom-0 left-0 right-0 z-[999] lg:hidden"
      >
        <div className="flex items-center justify-around border-t border-primary/10 bg-background p-4 shadow-xl">
          <SidebarItems items={menuOptions} isCollapsed={!isMediumToXL} setIsCollapsed={setIsCollapsed} />
        </div>
      </motion.nav>
    </>
  );
};
