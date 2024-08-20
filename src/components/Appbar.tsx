'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { AppbarAuth } from './AppbarAuth';
/* import { useRecoilState } from 'recoil'; */
/* import { sidebarOpen as sidebarOpenAtom } from '../store/atoms/sidebar'; */
/* import { usePathname } from 'next/navigation'; */
import clsx from 'clsx';
import { Sparkles } from 'lucide-react';
import { NavigationMenu } from './landing/appbar/nav-menu';
import Logo from './landing/logo/logo';
import ProfileDropdown from './profile-menu/ProfileDropdown';
import { SelectTheme } from './profile-menu/SelectTheme';
import MobileScreenSearch from './search/MobileScreenSearch';
import SearchBar from './search/SearchBar';
import { ThemeToggler } from './ThemeToggler';
import { Button } from './ui/button';
import MobileNav from './sidebar/MobileNav';

export const Appbar = ({
  className,
  showLogoforLanding,
}: {
  className: string;
  showLogoforLanding?: boolean;
}) => {
  const { data: session, status: sessionStatus } = useSession();
  /*   const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom); */
  /*   const currentPath = usePathname(); */

  const isLoading = sessionStatus === 'loading';

  return (
    <>
      <nav className={clsx(className)}>
        <div className="flex w-full items-center justify-between md:max-w-screen-2xl">
          {showLogoforLanding && <Logo onFooter={false} />}
          {session?.user ? (
            !isLoading && (
              <>
                <div className="flex items-center gap-2 md:hidden">
                  <MobileNav />
                  <Logo onFooter={false} label="" />
                </div>

                <div className="hidden md:block">
                  <SearchBar />
                </div>
                <div className="flex items-center space-x-2">
                  {/* Search Bar for smaller devices */}
                  <MobileScreenSearch />
                  <SelectTheme />
                  <ProfileDropdown />
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
      {/* <div className="h-16 w-full print:hidden" /> */}
    </>
  );
};
