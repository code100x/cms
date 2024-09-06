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
// import { JoinDiscord } from '@/components/JoinDiscord';
import { AppbarAuth } from '@/components/AppbarAuth';

export function NavigationMenu() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="border-none bg-transparent"
          size={'iconSM'}
        >
          <MenuIcon className="h-5 w-5" />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader className="flex w-full flex-col items-center text-center">
            <DrawerTitle>100xdevs</DrawerTitle>
            <DrawerDescription>Choose an option</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-16">
            <div className="flex flex-col items-center justify-center space-y-2">
              <Button size={'lg'} variant={'navLink'} asChild>
                <DrawerClose>
                  <Link
                    href={'https://harkirat.classx.co.in/new-courses'}
                    target="_blank"
                  >
                    <p className="text-zinc-950 dark:text-white">Join now</p>
                  </Link>
                </DrawerClose>
              </Button>

              <AppbarAuth isInMenu />
            </div>
          </div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
