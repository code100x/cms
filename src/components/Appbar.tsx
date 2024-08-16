'use client';

import Link from 'next/link';
import {
  Bell,
  Bookmark,
  Copy,
  FileStack,
  History,
  Menu,
  MessageSquare,
  Sparkles,
  HelpCircle,
  LogOut,
} from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Button } from './ui/button';
import Logo from './landing/logo/logo';
import { signOut, useSession } from 'next-auth/react';
import { sidebarOpen as sidebarOpenAtom } from '@/store/atoms/sidebar';
import { AppbarAuth } from './AppbarAuth';
import { ThemeToggler } from './ThemeToggler';
import { NavigationMenu } from './landing/appbar/nav-menu';
import { ToggleButton } from './Sidebar';
import { useRecoilState } from 'recoil';
import ProfileDropdown from './profile-menu/ProfileDropdown';
import MobileScreenSearch from './search/MobileScreenSearch';
import SearchBar from './search/SearchBar';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

const rs = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

interface AppbarNavProps {
  children: React.ReactNode;
}

const navLinks = [
  {
    label: 'My Courses',
    href: '/',
    icon: <Copy className="h-4 w-4" />,
  },
  {
    label: 'Resources',
    href: '/resources',
    icon: <FileStack className="h-4 w-4" />,
  },
  {
    label: 'Bookmarks',
    href: '/bookmarks',
    icon: <Bookmark className="h-4 w-4" />,
  },
  {
    label: 'Questions',
    href: '/questions',
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    label: 'Watch History',
    href: '/history',
    icon: <History className="h-4 w-4" />,
  },
];

const Appbar = ({ children }: AppbarNavProps) => {
  const { data: session, status: sessionStatus } = useSession();
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom);

  const pathname = usePathname();

  const isLoading = sessionStatus === 'loading';

  return (
    <>
      {session?.user ? (
        !isLoading && (
          <>
            <div
              className={cn(
                'grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]',
                rs.className,
              )}
            >
              <div className="hidden border-r md:block">
                <div className="flex h-full max-h-screen flex-col">
                  <div className="flex h-20 items-center border-b px-4 lg:px-6">
                    <Link
                      href="/"
                      className="flex items-center gap-2 font-semibold"
                    >
                      <Logo onFooter={false} />
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      className="ml-auto h-8 w-8"
                    >
                      <Bell className="h-4 w-4" />
                      <span className="sr-only">Toggle notifications</span>
                    </Button>
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <nav className="my-4 grid items-start gap-2 px-2 font-medium lg:px-4">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={` ${pathname === link.href ? 'bg-muted' : ''} flex items-center gap-3 rounded-lg px-3 py-3 transition-all`}
                        >
                          {link.icon}
                          {link.label}{' '}
                        </Link>
                      ))}
                    </nav>
                    <div className="mb-10 mt-auto">
                      <div className="flex flex-col gap-3 border-t px-4 py-4">
                        <Link href="#" className="flex gap-2 px-3 py-3">
                          <HelpCircle /> Help & Support
                        </Link>
                        <div
                          onClick={() => {
                            signOut();
                          }}
                          className="flex gap-2 rounded-lg bg-muted/15 px-3 py-3 text-red-500 hover:cursor-pointer"
                        >
                          <LogOut />
                          Logout
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col">
                <header className="flex h-20 items-center gap-4 border-b px-4 lg:px-6">
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="shrink-0 md:hidden"
                      >
                        <Menu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col">
                      <nav className="my-10 grid gap-2 text-lg font-medium">
                        {navLinks.map((link) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            className={` ${pathname === link.href ? 'bg-muted' : ''} mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-sm`}
                          >
                            {link.icon}
                            {link.label}{' '}
                          </Link>
                        ))}
                      </nav>
                    </SheetContent>
                  </Sheet>
                  <div className="w-full flex-1">
                    <div className="hidden md:block">
                      <SearchBar />
                    </div>
                    <MobileScreenSearch />
                  </div>
                  <div className="flex gap-4">
                    <ThemeToggler />
                    <ProfileDropdown />
                  </div>
                </header>
                <main>
                  <div className="flex flex-1 items-center justify-center">
                    {children}
                  </div>
                </main>
              </div>
            </div>
          </>
        )
      ) : (
        <>
          <nav className="fixed top-0 z-50 flex h-20 w-full items-center gap-2 border-b bg-background/80 px-4 shadow-sm backdrop-blur-md print:hidden">
            {pathname.includes('courses') && (
              <ToggleButton
                onClick={() => {
                  setSidebarOpen((p) => !p);
                }}
                sidebarOpen={sidebarOpen ? false : true}
              />
            )}
            <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
              <Logo onFooter={false} />

              <div className="flex items-center space-x-2">
                <div className="hidden items-center justify-around space-x-3 sm:flex md:block md:w-auto">
                  <AppbarAuth />

                  <Button size={'sm'} asChild>
                    <Link
                      href={'https://harkirat.classx.co.in/new-courses'}
                      target="_blank"
                    >
                      <p className="text-white">Join now</p>{' '}
                      <Sparkles className="ml-2 h-4 w-4 text-white duration-200 ease-linear hover:translate-x-0.5" />
                    </Link>
                  </Button>
                </div>
                <ThemeToggler />
                <div className="block">
                  <NavigationMenu />
                </div>
              </div>
            </div>
          </nav>
          {children}
        </>
      )}
    </>
  );
};

export default Appbar;
