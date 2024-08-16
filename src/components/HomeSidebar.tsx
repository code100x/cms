'use client';
import React, { useState } from 'react';
import Logo from './landing/logo/logo';
import {
  Bird,
  BookmarkIcon,
  FileStack,
  Files,
  HelpCircle,
  HistoryIcon,
  LogOut,
  Sidebar,
  SidebarClose,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTrigger,
} from '@/components/ui/sheet';
import Link from 'next/link';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

const HomeSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const menuItemLinks = [
    {
      href: '/',
      icon: <Files className={`mx-auto mr-2 h-5 w-5 ${isOpen && 'lg:mx-0'}`} />,
      label: 'My Courses',
    },
    {
      href: '/resources',
      icon: (
        <FileStack className={`mx-auto mr-2 h-5 w-5 ${isOpen && 'lg:mx-0'}`} />
      ),
      label: 'Resources',
    },

    {
      href: '/bookmarks',
      icon: (
        <BookmarkIcon
          className={`mx-auto mr-2 h-5 w-5 ${isOpen && 'lg:mx-0'}`}
        />
      ),
      label: 'Bookmarks',
    },
    {
      href: '/questions',
      icon: <Bird className={`mx-auto mr-2 h-5 w-5 ${isOpen && 'lg:mx-0'}`} />,
      label: `Questions`,
    },
    {
      href: '/history',
      icon: (
        <HistoryIcon
          className={`mx-auto mr-2 h-5 w-5 ${isOpen && 'lg:mx-0'}`}
        />
      ),
      label: 'Watch History',
    },
  ];
  const path = usePathname();

  return (
    <div
      className={`transition-width sticky top-0 z-50 hidden h-screen border-r duration-300 md:block md:w-[100px] ${isOpen ? 'lg:w-[250px]' : 'lg:w-[100px]'}`}
    >
      <div className="sticky top-0 z-50 flex h-screen w-full flex-col justify-between gap-2 print:hidden">
        <div>
          <div className="flex h-16 items-center justify-between border-b px-4 py-2">
            {isOpen && <Logo onFooter={false} />}

            <Button
              className="m-0 mx-auto p-0 hover:bg-transparent"
              variant={'ghost'}
              onClick={() => setIsOpen(!isOpen)}
            >
              <SidebarClose className="m-0 h-6 w-6 text-neutral-500 dark:text-neutral-400" />
            </Button>
          </div>
          <div className="my-3 flex flex-col gap-3 px-4 py-2">
            {menuItemLinks.map(({ href, label, icon }) => (
              <Link href={href} key={href}>
                <div
                  className={cn(
                    'flex items-center gap-2 rounded-md px-4 py-2',
                    path === href && 'bg-slate-100 dark:bg-slate-600/30',
                  )}
                >
                  {icon}
                  <span
                    className={`hidden font-medium lg:block ${!isOpen ? 'scale-0 lg:hidden' : 'scale-100'}`}
                  >
                    {label}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t px-4 py-2">
          <Link href="/">
            <div className="flex items-center gap-2 px-4 py-2">
              <HelpCircle
                className={`mx-auto mr-2 h-5 w-5 ${isOpen && 'lg:mx-0'}`}
              />
              <span
                className={`hidden font-medium lg:block ${!isOpen ? 'scale-0 lg:hidden' : 'scale-100'}`}
              >
                Help & Support
              </span>
            </div>
          </Link>
          <Button className="w-full justify-start gap-2 bg-red-600/40 px-4 py-2 text-red-600 dark:bg-red-500/20 dark:text-red-400">
            <LogOut className={`mx-auto mr-2 h-5 w-5 ${isOpen && 'lg:mx-0'}`} />
            <span
              className={`hidden font-medium lg:block ${!isOpen ? 'scale-0 lg:hidden' : 'scale-100'}`}
            >
              Logout
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();
  const menuItemLinks = [
    {
      href: '/',
      icon: <Files className={`mr-2 h-5 w-5`} />,
      label: 'My Courses',
    },
    {
      href: '/resources',
      icon: <FileStack className={`mr-2 h-5 w-5`} />,
      label: 'Resources',
    },

    {
      href: '/bookmarks',
      icon: <BookmarkIcon className={`mr-2 h-5 w-5`} />,
      label: 'Bookmarks',
    },
    {
      href: '/questions',
      icon: <Bird className={`mr-2 h-5 w-5`} />,
      label: `Questions`,
    },
    {
      href: '/history',
      icon: <HistoryIcon className={`mr-2 h-5 w-5`} />,
      label: 'Watch History',
    },
  ];
  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen((isOpen) => !isOpen)}>
      <SheetTrigger>
        <Sidebar className="m-0 h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </SheetTrigger>
      <SheetContent
        className="flex flex-col justify-between sm:w-[250px]"
        side={'left'}
      >
        <div>
          <div className="flex h-16 items-center justify-between border-b px-4 py-2">
            <Logo onFooter={false} />

            <SheetClose asChild>
              <SidebarClose className="m-0 h-6 w-6 text-neutral-500 dark:text-neutral-400" />
            </SheetClose>
          </div>
          <div className="my-3 flex flex-col gap-3 px-4 py-2">
            {menuItemLinks.map(({ href, label, icon }) => (
              <Link href={href} key={href}>
                <div
                  className={cn(
                    'flex items-center gap-2 rounded-md px-4 py-2',
                    path === href && 'bg-slate-100 dark:bg-slate-600/30',
                  )}
                >
                  {icon}
                  <span className={`font-medium`}>{label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t px-4 py-2">
          <Link href="/">
            <div className="flex items-center gap-2 px-4 py-2">
              <HelpCircle className={`mr-2 h-5 w-5`} />
              <span className={`font-medium`}>Help & Support</span>
            </div>
          </Link>
          <Button className="w-full justify-start gap-2 bg-red-600/40 px-4 py-2 text-red-600 dark:bg-red-500/20 dark:text-red-400">
            <LogOut className={`mr-2 h-5 w-5`} />
            <span className={`font-medium`}>Logout</span>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HomeSidebar;
