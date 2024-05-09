'use client';

import Link from 'next/link';

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

import { AppbarButton, DiscordButton } from './AppbarButton';

export const Appbar = () => {
  const session = useSession();

  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom);
  const currentPath = usePathname();
  const params = useParams();
  let bookmarkPageUrl = null;

  if (params.courseId && params.courseId[0]) {
    bookmarkPageUrl = `/courses/${params.courseId[0]}/bookmarks`;
  }

  // const [courseId, setCourseId] = useState<string | null>(null);
  // const router = useRouter();

  // useEffect(() => {
  //   const { courseId } = router.query;
  //   if (typeof courseId === 'string') {
  //     setCourseId(courseId);
  //   }
  // });

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
                <MobileScreenSearch />
                <div className="flex items-center space-x-2">
                  <div className="hidden sm:flex items-center justify-around md:w-auto md:block space-x-2">
                    {currentPath.includes('courses') && bookmarkPageUrl ? (
                      <>
                        <AppbarButton
                          className={
                            currentPath === bookmarkPageUrl
                              ? 'font-bold underline'
                              : ''
                          }
                          url={bookmarkPageUrl}
                          children={'Bookmarks'}
                        />
                        <DiscordButton />

                        <AppbarButton
                          url={'https://projects.100xdevs.com/'}
                          className={''}
                          children={'Slides'}
                        />

                        <AppbarButton
                          url={
                            'https://github.com/100xdevs-cohort-2/assignments'
                          }
                          className={'hidden custom-breakpoint1:inline'}
                          children={'Assignments'}
                        />
                        <AppbarButton
                          url={'/history'}
                          className={'hidden lg:inline'}
                          children={'Watch History'}
                        />
                        <div className="hidden lg:inline">
                          <AppbarAuth />
                        </div>
                      </>
                    ) : (
                      <>
                        <DiscordButton />

                        <AppbarButton
                          url={'https://projects.100xdevs.com/'}
                          className={''}
                          children={'Slides'}
                        />

                        <AppbarButton
                          url={
                            'https://github.com/100xdevs-cohort-2/assignments'
                          }
                          className={'hidden custom-breakpoint1:inline'}
                          children={'Assignments'}
                        />
                        <AppbarButton
                          url={'/history'}
                          className={'hidden custom-breakpoint:inline'}
                          children={'Watch History'}
                        />

                        <AppbarAuth />
                      </>
                    )}
                  </div>
                  <ThemeToggler />

                  <div
                    className={
                      currentPath.includes('courses') && bookmarkPageUrl
                        ? 'block lg:hidden'
                        : 'block custom-breakpoint:hidden'
                    }
                  >
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
