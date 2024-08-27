'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { SIDENAV_ITEMS } from '@/lib/constants/sideBarItems';
import { SideNavItem } from '@/types/sideBarItems';
import { usePathname } from 'next/navigation';
import { SideBarToggleBtn } from './sideBarToggleBtn';
import { ChevronDownIcon, LogOut } from 'lucide-react';
import Logo from './landing/logo/logo';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { useSidebarMediaQuery } from '@/hooks/useSidebarMediaQuery';
import { useHandleClickOutside } from '@/hooks/useHandleClickOutside';
import { sidebarOpen as sidebarOpenAtom } from '@/store/atoms/sidebar';
import { Button } from './ui/button';
import { signOut } from 'next-auth/react';
import { RefreshDb } from './RefreshDb';
import { refreshDb } from '@/actions/refresh-db';
import { Separator } from './ui/separator';

const SideBar = () => {
  const { isSmallScreen, sidebarOpen, setSidebarOpen } = useSidebarMediaQuery(
    '(min-width: 1024px)',
    sidebarOpenAtom,
  );
  const sideNavRef = useRef<HTMLDivElement | null>(null);

  useHandleClickOutside(sideNavRef, isSmallScreen, () => setSidebarOpen(false));

  return (
    <>
      <div
        ref={sideNavRef}
        style={{
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
        }}
        className={clsx(
          'border-muted-background absolute z-10 h-screen min-w-fit max-w-fit flex-1 overflow-y-auto border-r bg-background lg:static',
          {
            'md:flex': !sidebarOpen,
            'w-0': true,
          },
        )}
      >
        <div className="flex h-full flex-col justify-between gap-4">
          <div>
            <div
              className={clsx(
                'border-muted-background flex h-16 items-center border-b p-3',
                {
                  'min-w-[14rem]': sidebarOpen,
                },
              )}
            >
              <div
                className={clsx(
                  'flex w-full items-center gap-8 text-xl font-bold',
                  {
                    'justify-center': !sidebarOpen,
                    'justify-between': sidebarOpen,
                  },
                )}
              >
                {sidebarOpen && <Logo onFooter={false} />}
                <SideBarToggleBtn
                  setSidebarOpen={setSidebarOpen}
                  sidebarOpen={sidebarOpen}
                  className="h-fit w-fit cursor-pointer rounded-md p-1 hover:bg-secondary hover:text-foreground"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1 px-4 pt-4">
              {SIDENAV_ITEMS.map((item: SideNavItem, idx: number) => {
                return (
                  <MenuItem
                    key={idx}
                    item={item}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                    isSmallScreen={isSmallScreen}
                  />
                );
              })}
            </div>
          </div>
          <div
            className={clsx('mb-4 flex flex-col items-center justify-center', {
              'gap-2': sidebarOpen,
            })}
          >
            <div className="w-full p-2 px-4">
              <Button
                variant={'destructive'}
                className={clsx(
                  'flex w-full items-center gap-2 bg-red-background/40 text-red hover:bg-red-background/70',
                  {
                    'justify-start': sidebarOpen,
                    'justify-center': !sidebarOpen,
                  },
                )}
                onClick={() => signOut()}
              >
                <LogOut size={18} />
                {sidebarOpen && 'Logout'}
              </Button>
            </div>
            {sidebarOpen && <Separator className="text-foreground" />}
            <RefreshDb refreshDb={refreshDb} sidebarOpen={sidebarOpen} />
          </div>
        </div>
      </div>
    </>
  );
};
export default SideBar;

const MenuItem = ({
  item,
  sidebarOpen,
  setSidebarOpen,
  isSmallScreen,
}: {
  item: SideNavItem;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isSmallScreen: boolean;
}) => {
  const originPathname = usePathname();
  const pathname = `${originPathname}`;
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div>
      {/* sub menu options */}
      {item.submenu ? (
        <div className="min-w-[10rem]">
          <button
            onClick={toggleSubMenu}
            className={`flex w-full flex-row items-center justify-between rounded-md p-2 hover:bg-secondary ${pathname.includes(item.path) ? 'bg-zinc-100' : ''}`}
          >
            <div className="flex flex-row items-center justify-start space-x-3">
              {item.icon}
              {sidebarOpen && (
                <span className="flex text-sm font-semibold">{item.title}</span>
              )}
            </div>

            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
              <ChevronDownIcon width="16" height="16" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="ml-5 flex flex-col">
              {item.subMenuItems?.map((subItem: any, idx: any) => {
                return (
                  <TooltipProvider>
                    <Tooltip delayDuration={200} disableHoverableContent>
                      <TooltipTrigger asChild>
                        <Link
                          key={idx}
                          href={subItem.path}
                          className={` ${subItem.path === pathname ? 'font-semibold' : ''} flex w-full items-center justify-start rounded-md p-2 pl-4 text-sm font-normal hover:bg-secondary`}
                          onClick={() => isSmallScreen && setSidebarOpen(false)}
                        >
                          <span>{subItem.title}</span>
                        </Link>
                      </TooltipTrigger>
                      {!sidebarOpen && (
                        <TooltipContent>
                          <p>{item.title}</p>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
          )}
        </div>
      ) : (
        // normal menu option
        <TooltipProvider>
          <Tooltip delayDuration={200} disableHoverableContent>
            <TooltipTrigger asChild>
              <Link
                href={item.path}
                className={clsx(
                  'flex flex-row items-center gap-3 rounded-md px-3 py-2 hover:bg-secondary',
                  {
                    'bg-secondary text-foreground': item.path === pathname,
                    'justify-center px-2 py-3': !sidebarOpen,
                  },
                )}
                onClick={() => isSmallScreen && setSidebarOpen(false)}
              >
                {item.icon}
                <span
                  className={clsx('flex text-sm font-semibold', {
                    hidden: !sidebarOpen,
                  })}
                >
                  {item.title}
                </span>
              </Link>
            </TooltipTrigger>
            {!sidebarOpen && (
              <TooltipContent>
                <p>{item.title}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
