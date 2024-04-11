'use client';

import Link from 'next/link';
import { JoinDiscord } from './JoinDiscord';
import { AppbarAuth } from './AppbarAuth';
import { useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import { sidebarOpen as sidebarOpenAtom } from '../store/atoms/sidebar';
import { ToggleButton } from './Sidebar';
import { useParams, usePathname } from 'next/navigation';
import Logo from './landing/logo/logo';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';
import { ThemeToggler } from './ThemeToggler';
import { NavigationMenu } from './landing/appbar/nav-menu';
import SearchBar from './search/SearchBar';
import MobileScreenSearch from './search/MobileScreenSearch';
import { useEffect, useState } from 'react';

export const Appbar = () => {
  const session = useSession();
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const currentPath = usePathname();
  const params = useParams();
  let bookmarkPageUrl = null;
  if (params.courseId && params.courseId[0]) {
    bookmarkPageUrl = `/courses/${params.courseId[0]}/bookmarks`;
  }

  const controlAppbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
        setShow(false);
      } else { // if scroll up show the navbar
        setShow(true);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlAppbar);

      // cleanup function
      return () => {
        window.removeEventListener('scroll', controlAppbar);
      };
    }
  }, [controlAppbar]);

  return (
    <>
      <nav className={`fixed z-50 top-0 px-4 w-full h-16 border-b shadow-sm bg-background/80 backdrop-blur-md flex items-center gap-2 print:hidden transform ${show ? 'translate-y-0' : '-translate-y-full'}`}>
        {currentPath.includes('courses') && (
          <ToggleButton
            onClick={() => {
              setSidebarOpen((p) => !p);
            }}
            sidebarOpen={sidebarOpen ? false : true}
          />
        )}
        <div className="md:max-w-screen-2xl mx-auto flex items-center justify-between w-full">
          <Logo onFooter={false} />

          {session?.data?.user ? (
            <>
              <div className="hidden md:block">
                <SearchBar />
              </div>
              <div className="flex items-center space-x-2">
                {/* Search Bar for smaller devices */}
                <MobileScreenSearch />
                <div className="flex items-center space-x-2">
                  <div className="hidden sm:flex items-center justify-around md:w-auto md:block space-x-2">
                    {currentPath.includes('courses') && bookmarkPageUrl && (
                      <Button
                        variant="link"
                        className={
                          currentPath === bookmarkPageUrl
                            ? 'font-bold underline'
                            : ''
                        }
                        size={'sm'}
                        asChild
                      >
                        <Link href={bookmarkPageUrl}>Bookmarks</Link>
                      </Button>
                    )}

                    <Button variant={'link'} size={'sm'} asChild>
                      <JoinDiscord isNavigated={false} />
                    </Button>

                    <Button size={'sm'} variant={'link'} asChild>
                      <Link
                        href={'https://projects.100xdevs.com/'}
                        target="_blank"
                      >
                        Slides
                      </Link>
                    </Button>

                    <Button size={'sm'} variant={'link'} asChild>
                      <Link
                        href={
                          'https://github.com/100xdevs-cohort-2/assignments'
                        }
                        target="_blank"
                      >
                        Assignments
                      </Link>
                    </Button>
                    <Button size={'sm'} variant={'link'} asChild>
                      <Link href={'/history'}>Watch History</Link>
                    </Button>
                    <AppbarAuth />
                  </div>

                  <ThemeToggler />

                  <div className="block sm:hidden">
                    <NavigationMenu />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex items-center justify-around md:w-auto md:block space-x-3">
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
      <div className="h-16 w-full print:hidden" />
    </>
  );
};
