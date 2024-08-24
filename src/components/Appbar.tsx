'use client';

import Link from 'next/link';
import { AppbarAuth } from './AppbarAuth';
import { useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { NavigationMenu } from './landing/appbar/nav-menu';
import SearchBar from './search/SearchBar';
import MobileScreenSearch from './search/MobileScreenSearch';
import ProfileDropdown from './profile-menu/ProfileDropdown';
import { ThemeToggler } from './ThemeToggler';
import { Sparkles } from 'lucide-react';
import Logo from './landing/logo/logo';
import clsx from 'clsx';

export const Appbar = ({
  showLogoforLanding,
}: {
  showLogoforLanding?: boolean;
}) => {
  const { data: session, status: sessionStatus } = useSession();
  const isLoading = sessionStatus === 'loading';

  return (
    <>
      <nav className="flex h-16 w-full items-center gap-2 gap-4 border-b bg-background/80 p-4 px-4 shadow-sm backdrop-blur-md print:hidden">
        <div className="m-0 flex w-full items-center justify-between">
          {showLogoforLanding && <Logo onFooter={false} />}

          {session?.user ? (
            !isLoading && (
              <div className={clsx('flex w-full items-center justify-between')}>
                <div className="hidden md:block">
                  <SearchBar />
                </div>
                <div className="flex w-full items-center justify-between md:w-fit">
                  <MobileScreenSearch />
                  <ProfileDropdown />
                </div>
              </div>
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
      {/* <div className="h-16 w-full print:hidden" /> */}
    </>
  );
};
