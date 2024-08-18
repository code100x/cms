'use client';

import { Sparkles } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { AppbarAuth } from './AppbarAuth';
import { NavigationMenu } from './landing/appbar/nav-menu';
import Logo from './landing/logo/logo';
import ProfileDropdown from './profile-menu/ProfileDropdown';
import MobileScreenSearch from './search/MobileScreenSearch';
import SearchBar from './search/SearchBar';
import { ThemeToggler } from './ThemeToggler';
import { Button } from './ui/button';

export const Appbar = () => {
  const { data: session, status: sessionStatus } = useSession();

  const isLoading = sessionStatus === 'loading';

  return (
    <>
      <nav className="fixed top-0 z-50 flex h-16 w-full items-center gap-2 border-b bg-background/80 px-4 shadow-sm backdrop-blur-md print:hidden">
        {/* {currentPath.includes('courses') && (
          <ToggleButton
            onClick={() => {
              setSidebarOpen((p) => !p);
            }}
            sidebarOpen={sidebarOpen ? false : true}
          />
        )} */}
        <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
          <Logo onFooter={false} />

          {session?.user ? (
            !isLoading && (
              <>
                <div className="hidden md:block">
                  <SearchBar />
                </div>
                <div className="flex items-center space-x-2">
                  {/* Search Bar for smaller devices */}
                  <MobileScreenSearch />
                  <ProfileDropdown />
                  <ThemeToggler />
                  <div className="block md:hidden">
                    <NavigationMenu />
                  </div>
                </div>
              </>
            )
          ) : (
            <div className="flex items-center space-x-2">
              <div className="items-center justify-around space-x-3 sm:flex md:block md:w-auto">
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
      <div className="h-16 w-full print:hidden" />
    </>
  );
};
