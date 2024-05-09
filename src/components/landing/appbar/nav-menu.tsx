'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { AppbarAuth } from '@/components/AppbarAuth';
import { usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';
import { NavButton, NavbarButton } from '@/components/AppbarButton';

export function NavigationMenu() {
  const session = useSession();
  const currentPath = usePathname();
  const params = useParams();
  let bookmarkPageUrl = null;
  if (params.courseId && params.courseId[0]) {
    bookmarkPageUrl = `/courses/${params.courseId[0]}/bookmarks`;
  }

  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            variant="outline"
            className="bg-transparent border-none"
            size={'iconSM'}
          >
            <MenuIcon className="h-5 w-5" />
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader className="w-full flex flex-col items-center text-center">
              <DrawerTitle>100xdevs</DrawerTitle>
              <DrawerDescription>Choose an option</DrawerDescription>
            </DrawerHeader>

            {session?.data?.user ? (
              <div className="p-4 pb-16">
                <div className="flex flex-col items-center justify-center space-y-2 text-lg">
                  {currentPath.includes('courses') && bookmarkPageUrl ? (
                    <>
                      <NavbarButton
                        url={bookmarkPageUrl}
                        className={'block sm:hidden'}
                        children={'Bookmark'}
                        value={''}
                        asChild={true}
                      />
                      <NavButton />

                      <NavbarButton
                        url={'/history'}
                        className={'block lg:hidden'}
                        children={'Watch History'}
                        value={''}
                        asChild={true}
                      />
                    </>
                  ) : (
                    <>
                      <NavButton />
                      <NavbarButton
                        url={'/history'}
                        className={'block custom-breakpoint:hidden'}
                        children={'Watch History'}
                        value={''}
                        asChild={true}
                      />
                    </>
                  )}

                  <AppbarAuth isInMenu={true} />
                </div>
              </div>
            ) : (
              <div className="p-4 pb-16">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Button size={'lg'} variant={'navLink'} asChild>
                    <DrawerClose>
                      <Link
                        href={'https://harkirat.classx.co.in/new-courses'}
                        target="_blank"
                      >
                        <p className="text-zinc-950 dark:text-white">
                          Join now
                        </p>
                      </Link>
                    </DrawerClose>
                  </Button>

                  <AppbarAuth isInMenu={true} />
                </div>
              </div>
            )}

            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
