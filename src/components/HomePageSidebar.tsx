'use client';

import { useState, useEffect, useRef } from 'react';
import {
  BookmarkIcon,
  File,
  FileStack,
  HelpCircle,
  History,
  LogOut,
  MessageSquare,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { signOut, useSession } from 'next-auth/react';
import { homeSidebarOpen as homeSidebarOpenAtom } from '../store/atoms/homeSidebar';
import { useRecoilState } from 'recoil';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

const navMenu = [
  {
    id: 1,
    icon: <File />,
    link: '/',
    text: 'My Courses',
  },
  {
    id: 2,
    icon: <FileStack />,
    link: '/resources',
    text: 'Resources',
  },
  {
    id: 3,
    icon: <BookmarkIcon />,
    link: '/bookmarks',
    text: 'Bookmarks',
  },
  {
    id: 4,
    icon: <MessageSquare />,
    link: '/questions',
    text: 'Questions',
  },
  {
    id: 5,
    icon: <History />,
    link: '/history',
    text: 'Watch History',
  },
];

export const HomePageSidebar = () => {
  const [activeId, setActiveId] = useState<number | null>(1);
  const [homeSidebarOpen, setHomeSidebarOpen] =
    useRecoilState(homeSidebarOpenAtom);
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const { data: session, status: sessionStatus } = useSession();

  const handleMenuClick = (id: number) => {
    setActiveId(id);
    if (!homeSidebarOpen && window.innerWidth <= 768) {
      setHomeSidebarOpen(false);
      setOverlayVisible(false);
    }
  };

  const handleOverlayClick = () => {
    setHomeSidebarOpen(true);
    setOverlayVisible(false);
  };

  useEffect(() => {
    if (!homeSidebarOpen && window.innerWidth <= 768) {
      setOverlayVisible(true);
    } else {
      setOverlayVisible(false);
    }
  }, [homeSidebarOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        handleOverlayClick();
      }
    };
    if (overlayVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [overlayVisible]);

  if (!session?.user) {
    return null;
  }

  return (
    <>
      {overlayVisible && (
        <div
          className="fixed inset-0 z-30 bg-white opacity-60"
          onClick={handleOverlayClick}
        />
      )}
      <div
        ref={sidebarRef}
        className={`z-40 flex h-[calc(100vh-64px)] flex-col justify-between border-r bg-white dark:bg-[#020817] ${homeSidebarOpen ? 'w-20 max-md:hidden lg:flex' : 'w-[250px]'} max-md:absolute md:flex-shrink-0 lg:static`}
      >
        <div className="m-2 flex flex-col gap-4 overflow-y-auto p-2">
          {navMenu.map((el) => (
            <Link
              href={el.link}
              key={el.id}
              className={`flex gap-2 rounded-xl ${homeSidebarOpen ? 'px-0.5' : 'px-4'} items-center py-2 ${activeId === el.id ? 'bg-gray-200 dark:bg-slate-800 dark:text-white' : ''} ${homeSidebarOpen ? 'justify-center' : 'justify-start'}`}
              onClick={() => handleMenuClick(el.id)}
            >
              {!homeSidebarOpen ? (
                el.icon
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>{el.icon}</TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>{el.text}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {!homeSidebarOpen && <span>{el.text}</span>}
            </Link>
          ))}
        </div>
        <div className="w-full border-t">
          <div className="m-2 flex flex-col gap-4 p-2">
            <Link
              href={'/help-support'}
              className={`flex gap-2 rounded-xl ${homeSidebarOpen ? 'px-0.5' : 'px-4'} items-center py-2 ${homeSidebarOpen ? 'justify-center' : 'justify-start'}`}
            >
              {!homeSidebarOpen ? (
                <HelpCircle />
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle />
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Help & Support</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              {!homeSidebarOpen && <span>Help & Support</span>}
            </Link>
            <Button
              onClick={() => signOut()}
              className={`flex gap-2 rounded-xl ${homeSidebarOpen ? 'px-0.5' : 'px-4'} bg-red-100 py-2 text-red-600 hover:bg-red-200 dark:bg-[#DC26261A] dark:text-red-600 hover:dark:bg-red-100 ${homeSidebarOpen ? 'justify-center' : 'justify-start'}`}
            >
              <LogOut />
              {!homeSidebarOpen && <span>LogOut</span>}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
