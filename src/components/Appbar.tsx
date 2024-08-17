'use client';

import { AppbarAuth } from './AppbarAuth';
import { Button } from './ui/button';
import Link from 'next/link';
import Logo from './landing/logo/logo';
import MobileScreenSearch from './search/MobileScreenSearch';
import { NavigationMenu } from './landing/appbar/nav-menu';
import ProfileDropdown from './profile-menu/ProfileDropdown';
import SearchBar from './search/SearchBar';
import { Sparkles } from 'lucide-react';
import { ThemeToggler } from './ThemeToggler';
import { ToggleButton } from './Sidebar';
import { sidebarOpen as sidebarOpenAtom } from '../store/atoms/sidebar';
import { usePathname } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { useSession } from 'next-auth/react';

export const Appbar = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom);
  const currentPath = usePathname();

  const isLoading = sessionStatus === 'loading';

  return (
    <>
      <nav className="flex h-16 w-full grow items-center gap-2 border-b bg-background/80 px-4 shadow-sm backdrop-blur-md print:hidden">
        {currentPath.includes('courses') && (
          <ToggleButton
            onClick={() => {
              setSidebarOpen((p) => !p);
            }}
            sidebarOpen={sidebarOpen ? false : true}
          />
        )}

        {session?.user ? (
          !isLoading && (
            <div className="ml-auto flex w-full items-center justify-between">
              <div className="hidden md:block">
                <SearchBar />
              </div>
              <div className="flex items-center space-x-2">
                {/* Search Bar for smaller devices */}
                <MobileScreenSearch />
                <ProfileDropdown />
              </div>
            </div>
          )
        ) : (
          <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
            {' '}
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
        )}
      </nav>
    </>
  );
};
