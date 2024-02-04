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
import { JoinDiscord } from '@/components/JoinDiscord';
import { AppbarAuth } from '@/components/AppbarAuth';

export function NavigationMenu() {
  const session = useSession();

  return (
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
                <Button variant={'navLink'} size={'lg'} asChild>
                  <DrawerClose asChild>
                    <JoinDiscord isInMenu={true} isNavigated={false} />
                  </DrawerClose>
                </Button>

                <Button size={'lg'} variant={'navLink'} asChild>
                  <DrawerClose>
                    <Link
                      href={'https://github.com/100xdevs-cohort-2/assignments'}
                      target="_blank"
                    >
                      Assignments
                    </Link>
                  </DrawerClose>
                </Button>

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
                      <p className="text-white">Join now</p>
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
  );
}
