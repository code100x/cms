'use client';
import Link from 'next/link';
import React from 'react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { JoinDiscord } from './JoinDiscord';
import { AppbarAuth } from './AppbarAuth';
import { useSession } from 'next-auth/react';

export const Appbar = () => {
  const session = useSession();

  return (
    <nav className="">
      <div className="flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex">
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://appx-wsb.classx.co.in/subject/2023-01-17-0.17044360120951185.jpg"
              className="h-8 rounded-full"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              100xdevs
            </span>
          </Link>
          <div className="flex justify-center ml-4">
            {session?.data?.user ? (
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <JoinDiscord />
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <Link
                      href="https://github.com/100xdevs-cohort-2/assignments"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        Assignments
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            ) : null}
          </div>
        </div>
        <AppbarAuth />
      </div>
    </nav>
  );
};
