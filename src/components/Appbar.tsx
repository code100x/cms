'use client';

import Link from 'next/link';
import { AppbarAuth } from './AppbarAuth';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { sidebarOpen as sidebarOpenAtom } from '../store/atoms/sidebar';
import { ToggleButton } from './Sidebar';
import { usePathname } from 'next/navigation';
import Logo from './landing/logo/logo';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';
import { NavigationMenu } from './landing/appbar/nav-menu';
import SearchBar from './search/SearchBar';
import MobileScreenSearch from './search/MobileScreenSearch';
import ProfileDropdown from './profile-menu/ProfileDropdown';
import { ThemeToggler } from './ThemeToggler';

export const Appbar = () => {
  const session = useSession();
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom);
  const currentPath = usePathname();
  const courseId = Number(currentPath.split('/')[2]);

  return (
    <>
      <nav className="fixed top-0 z-50 flex items-center w-full h-16 gap-2 px-4 border-b shadow-sm bg-background/80 backdrop-blur-md print:hidden">
        {currentPath.includes('courses') && (
          <ToggleButton
            onClick={() => {
              setSidebarOpen((p) => !p);
            }}
            sidebarOpen={sidebarOpen ? false : true}
          />
        )}
        <div className="flex items-center justify-between w-full mx-auto md:max-w-screen-2xl">
          <Logo onFooter={false} />

          {session?.data?.user ? (
            <>
              <div className="hidden md:block">
                <SearchBar />
              </div>
              <div className="flex items-center space-x-2">
                {/* Search Bar for smaller devices */}
                <MobileScreenSearch />
                {/* resources for cohort 2 and DSA, courses id (3  and 7 respectively) */}
                {(courseId === 3 || courseId === 7) && (
                  <Button>
                    <Link
                      className="text-white text-md text-bold"
                      target="_blank"
                      href="https://projects.100xdevs.com/"
                    >
                      Slides(Resources)
                    </Link>
                  </Button>
                )}
                <ProfileDropdown />
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="items-center justify-around hidden space-x-3 sm:flex md:w-auto md:block">
                <AppbarAuth />

                <Button size={'sm'} asChild>
                  <Link
                    href={'https://harkirat.classx.co.in/new-courses'}
                    target="_blank"
                  >
                    <p className="text-white">Join now</p>{' '}
                    <Sparkles className="text-white ml-2 h-4 w-4 hover:translate-x-0.5 ease-linear duration-200" />
                  </Link>
                </Button>
              </div>
              <ThemeToggler />
              <div className="block sm:hidden">
                <NavigationMenu />
              </div>
            </div>
          )}
        </div>
      </nav>
      <div className="w-full h-16 print:hidden" />
    </>
  );
};
