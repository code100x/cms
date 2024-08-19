'use client';

import Link from 'next/link';
import { AppbarAuth } from './AppbarAuth';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { sidebarOpen as sidebarOpenAtom } from '../store/atoms/sidebar';
// import { ToggleButton } from './Sidebar';
import { usePathname } from 'next/navigation';
import Logo from './landing/logo/logo';
import { Button } from './ui/button';
import { PanelLeftOpen, Sparkles } from 'lucide-react';
import { NavigationMenu } from './landing/appbar/nav-menu';
import SearchBar from './search/SearchBar';
import MobileScreenSearch from './search/MobileScreenSearch';
import ProfileDropdown from './profile-menu/ProfileDropdown';
import { ThemeToggler } from './ThemeToggler';
import { mainSideBarToggle } from '@/store/atoms/mainSidebar';

export const Appbar = () => {
  const { data: session, status: sessionStatus } = useSession();
  // const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom);
  // const currentPath = usePathname();

  const [isMainSideBarCompressed, setIsMainSideBarCompressed] = useRecoilState(mainSideBarToggle);

  const isLoading = sessionStatus === 'loading';

  return (
    <nav className='border-b h-16 flex items-center justify-center px-4 py-2'>
      <div className="flex items-center w-full justify-between">
        {!session?.user && <Logo textVisibilty={true} onFooter={false} />}

        {session?.user ? (
          !isLoading && (
            <>
              <div className='flex items-center justify-center gap-2 md:hidden'>
                <PanelLeftOpen className='cursor-pointer' onClick={() => setIsMainSideBarCompressed(prev => !prev)} size={18} />
                <Logo textVisibilty={false} onFooter={false} />
              </div>
              <div className="hidden md:block">
                <SearchBar />

              </div>
              <div className="flex items-center space-x-2">
                {/* Search Bar for smaller devices */}
                <ThemeToggler />
                <MobileScreenSearch />
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
  );
};
