'use client';

import Link from 'next/link';
import { AppbarAuth } from './AppbarAuth';
import { useSession } from 'next-auth/react';
import { Logo, SmallLogo } from './landing/logo/logo';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';
import { NavigationMenu } from './landing/appbar/nav-menu';
import SearchBar from './search/SearchBar';
import MobileScreenSearch from './search/MobileScreenSearch';
import ProfileDropdown from './profile-menu/ProfileDropdown';
import { ThemeToggler } from './ThemeToggler';
import { cn } from '@/lib/utils';
import { sidebarOpen as sidebarOpenAtom } from '@/store/atoms/sidebar';
import { SheetMenu } from './sidebar/SheetMenu';
import { useRecoilValue } from 'recoil';

export const Appbar = () => {
  const { data: session, status: sessionStatus } = useSession();

  const isLoading = sessionStatus === 'loading';
  const sidebarOpen = useRecoilValue(sidebarOpenAtom);

  return (
    <div>
      <nav className="fixed top-0 z-50 flex h-18 w-full items-center gap-2 border-b bg-background px-4">
        <div className="flex w-full items-center justify-between md:max-w-screen-2xl">
          {!session?.user && <Logo onFooter={false} />}
          {session?.user ? (
            !isLoading && (
              <>
                <div
                  className={cn(
                    'hidden items-center justify-between transition-all duration-300 ease-in-out max-sm:hidden lg:flex',
                    sidebarOpen
                      ? 'w-[calc(100%-240px)]'
                      : 'w-[calc(100%-60px)]',
                  )}
                >
                  <div className="hidden md:block">
                    <SearchBar />
                  </div>
                  <div className="flex items-center space-x-2">
                    <ThemeToggler />
                    <ProfileDropdown />
                  </div>
                </div>
                <div className="flex w-full justify-between p-0 lg:hidden">
                  {/* App Bar for smaller devices */}
                  <div className="flex items-center">
                    <SheetMenu />
                    <SmallLogo />
                  </div>
                  <div className="flex items-center space-x-1">
                    <MobileScreenSearch />
                    <ThemeToggler />
                    <ProfileDropdown />
                  </div>
                </div>
              </>
            )
          ) : (
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
          )}
        </div>
      </nav>
      <div className="h-18 w-full bg-background print:hidden" />
    </div>
  );
};
