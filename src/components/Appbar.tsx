'use client';

import Link from 'next/link';
import { AppbarAuth } from './AppbarAuth';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import Logo from './landing/logo/logo';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';
import { NavigationMenu } from './landing/appbar/nav-menu';
import SearchBar from './search/SearchBar';
import MobileScreenSearch from './search/MobileScreenSearch';
import ProfileDropdown from './profile-menu/ProfileDropdown';
import { ThemeToggler } from './ThemeToggler';
import { homeSidebarOpen as homeSidebarOpenAtom } from '../store/atoms/homeSidebar';
import { PanelLeftOpen, PanelRightOpen } from 'lucide-react';

export const Appbar = () => {
  const { data: session, status: sessionStatus } = useSession();
  const [homeSidebarOpen, setHomeSidebarOpen] =
    useRecoilState(homeSidebarOpenAtom);
  const toggleSidebar = () => {
    setHomeSidebarOpen((prev: boolean) => !prev);
  };

  const isLoading = sessionStatus === 'loading';

  return (
    <>
      <nav
        className={`fixed top-0 z-50 flex h-16 w-[-webkit-fill-available] items-center gap-2 border-b bg-background/80 ${session?.user && !isLoading ? 'pr-4' : 'px-4'} shadow-sm backdrop-blur-md print:hidden`}
      >
        {session?.user && !isLoading && (
          <div
            className={`flex h-16 items-center gap-2 ${homeSidebarOpen ? 'min-w-20 justify-center' : 'min-w-[250px] justify-between'} border-r px-2`}
          >
            {!homeSidebarOpen && <Logo onFooter={false} />}
            <button onClick={toggleSidebar} className="px-0.5">
              {homeSidebarOpen ? <PanelLeftOpen /> : <PanelRightOpen />}
            </button>
          </div>
        )}
        <div className="mx-auto flex w-full items-center justify-between md:max-w-screen-2xl">
          {!session?.user && <Logo onFooter={false} />}

          {session?.user ? (
            !isLoading && (
              <>
                <div className="hidden md:block">
                  <SearchBar />
                </div>
                <div className="flex w-full items-center justify-end space-x-2">
                  {/* Search Bar for smaller devices */}
                  <MobileScreenSearch />
                  <ThemeToggler />
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
      <div className="h-16 w-full print:hidden" />
    </>
  );
};
