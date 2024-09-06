/* eslint-disable no-nested-ternary */
'use client';

import Link from 'next/link';
import { AppbarAuth } from './AppbarAuth';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import Logo from './landing/logo/logo';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';
import { NavigationMenu } from './landing/appbar/nav-menu';
import SearchBar from './search/SearchBar';
import MobileScreenSearch from './search/MobileScreenSearch';
import ProfileDropdown from './profile-menu/ProfileDropdown';
import { ThemeToggler } from './ThemeToggler';
import { SelectTheme } from './profile-menu/SelectTheme';

export const Appbar = ({
  className,
  showLogoforLanding,
}: {
  className: string;
  showLogoforLanding?: boolean;
}) => {
  const { data: session, status: sessionStatus } = useSession();

  const isLoading = sessionStatus === 'loading';

  return (
    <>
      <nav className={clsx(className)}>
        <div className="flex w-full items-center justify-between md:max-w-screen-2xl">
          {showLogoforLanding && <Logo onFooter={false} />}
          {isLoading ? (
            // Show a loading indicator or skeleton here
            <div className="flex w-full items-center justify-end space-x-2 p-1">
              <div className="hidden items-center justify-around space-x-3 sm:flex md:block md:w-auto">
                <div className="h-8 w-24 animate-pulse rounded-md bg-gray-600"></div>
              </div>
              <div className="h-8 w-8 animate-pulse rounded-md bg-gray-600"></div>
              <div className="h-8 w-8 animate-pulse rounded-full bg-gray-600"></div>
            </div>
          ) : session?.user ? (
            <>
              <div className="hidden md:block">
                <SearchBar />
              </div>
              <div className="flex items-center space-x-2">
                <MobileScreenSearch />
                <SelectTheme />
                <ProfileDropdown />
              </div>
            </>
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
    </>
  );
};
