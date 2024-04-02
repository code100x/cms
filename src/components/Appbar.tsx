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
import { useState } from 'react';

export const Appbar = () => {
  const session = useSession();
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentPath = usePathname();
  const params = useParams();
  let bookmarkPageUrl = null;
  if (params.courseId && params.courseId[0]) {
    bookmarkPageUrl = `/courses/${params.courseId[0]}/bookmarks`;
  }

  return (
    <>
      <nav className="fixed z-50 top-0 px-4 w-full h-16 border-b shadow-sm bg-background/80 backdrop-blur-md flex items-center gap-2 print:hidden">
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
                {/* sm:flex md:w-auto md:block*/}
                <MobileScreenSearch />

                <div className="flex items-center space-x-2">
                  <div className="hidden sm:flex">
                    <div className="hidden sm:flex h-8 w-8 bg-slate-100 text-black dark:bg-gray-600 rounded-full  items-center text-center dark:text-white  flex-col justify-center">
                      <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        type="button"
                        id="dropdownHoverButton"
                        data-dropdown-toggle="dropdownHover"
                        data-dropdown-trigger="hover"
                      >
                        <span className="user-name">
                          {session.data?.user?.name?.charAt(0).toUpperCase()}
                        </span>
                      </button>
                    </div>
                    {dropdownOpen && (
                      <div className=" z-20 dark:bg-gray-800 p-4 dark:text-white bg-white fixed top-[52px] right-[36px]  divide-y divide-gray-100 rounded-lg shadow w-44 items-center justify-around  space-x-2">
                        <ul
                          aria-labelledby="dropdownHoverButton"
                          className="w-full items-center text-center"
                        >
                          <li>
                            {currentPath.includes('courses') &&
                              bookmarkPageUrl && (
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
                          </li>
                          <li>
                            <Button variant={'link'} size={'sm'} asChild>
                              <JoinDiscord isNavigated={false} />
                            </Button>
                          </li>
                          <li>
                            <Button size={'sm'} variant={'link'} asChild>
                              <Link
                                href={'https://projects.100xdevs.com/'}
                                target="_blank"
                              >
                                Slides
                              </Link>
                            </Button>
                          </li>
                          <li>
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
                          </li>
                          <li>
                            <Button size={'sm'} variant={'link'} asChild>
                              <Link href={'/history'}>Watch History</Link>
                            </Button>
                          </li>
                          <li>
                            <AppbarAuth />
                          </li>
                        </ul>
                      </div>
                    )}
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
