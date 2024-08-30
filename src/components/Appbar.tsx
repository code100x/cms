'use client';

import Link from 'next/link';
import { AppbarAuth } from './AppbarAuth';
import { useSession } from 'next-auth/react';
/* import { useRecoilState } from 'recoil'; */
/* import { sidebarOpen as sidebarOpenAtom } from '../store/atoms/sidebar'; */
/* import { usePathname } from 'next/navigation'; */
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
import { Skeleton } from '@/components/ui/skeleton';

export const Appbar = ({
  className,
  showLogoforLanding,
}: {
  className: string;
  showLogoforLanding?: boolean;
}) => {
  const { status: sessionStatus } = useSession();
  /*   const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom); */
  /*   const currentPath = usePathname(); */

  return (
    <>
      <nav className={clsx(className)}>
        <div className="container flex w-full items-center justify-between md:max-w-screen-2xl">
          {showLogoforLanding && <Logo onFooter={false} />}
          {sessionStatus === 'loading' && (
            <div className="flex items-center space-x-2">
              <div className="space-y-2">
                <Skeleton className="h-10 w-[1300px]" />
              </div>
              <Skeleton className="h-10 w-10 rounded-md" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          )}
          {sessionStatus === 'authenticated' && (
            <>
              <div className="hidden md:block">
                <SearchBar />
              </div>
              <div className="flex items-center space-x-2">
                {/* Search Bar for smaller devices */}
                {/* Make sure MobileScreenSearch is defined */}
                <MobileScreenSearch />
                <SelectTheme />
                <ProfileDropdown />
              </div>
            </>
          )}
          {sessionStatus === 'unauthenticated' && (
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
