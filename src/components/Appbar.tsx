'use client';

import Link from 'next/link';
import { AppbarAuth } from './AppbarAuth';
import { useSession } from 'next-auth/react';
import Logo from './landing/logo/logo';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';
import { NavigationMenu } from './landing/appbar/nav-menu';
import SearchBar from './search/SearchBar';
import MobileScreenSearch from './search/MobileScreenSearch';
import { SelectTheme } from './profile-menu/SelectTheme';
import { motion } from 'framer-motion';
export const Appbar = () => {
  const { data: session, status: sessionStatus } = useSession();
  const isLoading = sessionStatus === 'loading';

  return (
    <nav className="fixed top-0 z-[99999] mx-auto w-full p-4">
      <section className="md:hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
            type: 'spring',
            damping: 10,
          }}
          className="mx-auto flex items-center justify-between gap-4 rounded-xl bg-neutral-50 p-4 shadow-md dark:bg-neutral-900"
        >
          <Logo />
          {session?.user ? (
            !isLoading && (
              <>
                <div className="flex w-fit items-center justify-between gap-4">
                  <div className="hidden md:block">
                    <SearchBar />
                  </div>
                  <MobileScreenSearch />
                  <SelectTheme />
                </div>
              </>
            )
          ) : (
            <div className="flex items-center">
              <div className="hidden items-center justify-around space-x-3 md:flex md:w-auto">
                <AppbarAuth />
                <Button size={'sm'} asChild>
                  <Link
                    href={'https://harkirat.classx.co.in/new-courses'}
                    target="_blank"
                  >
                    Join now
                    <Sparkles className="ml-2 h-4 w-4 duration-200 ease-linear hover:translate-x-0.5" />
                  </Link>
                </Button>
                <SelectTheme />
              </div>
              <div className="flex items-center gap-2 md:hidden">
                <SelectTheme />
                <NavigationMenu />
              </div>
            </div>
          )}
        </motion.div>
      </section>
      <section className="mx-auto hidden w-full max-w-7xl justify-between md:flex">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
            type: 'spring',
            damping: 10,
          }}
          className="flex items-center justify-between gap-4 rounded-xl bg-neutral-50 p-4 shadow-md dark:bg-neutral-900"
        >
          <Logo />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: 'easeInOut',
            type: 'spring',
            damping: 10,
          }}
          className="flex items-center justify-between gap-4 rounded-xl bg-neutral-50 p-4 shadow-md dark:bg-neutral-900"
        >
          {session?.user ? (
            !isLoading && (
              <>
                <div className="flex w-fit items-center justify-between gap-4">
                  <div className="hidden md:block">
                    <SearchBar />
                  </div>
                  <MobileScreenSearch />
                  <SelectTheme />
                </div>
              </>
            )
          ) : (
            <div className="flex items-center">
              <div className="hidden items-center justify-around space-x-3 md:flex md:w-auto">
                <AppbarAuth />
                <Button size={'sm'} asChild>
                  <Link
                    href={'https://harkirat.classx.co.in/new-courses'}
                    target="_blank"
                  >
                    Join now
                    <Sparkles className="ml-2 h-4 w-4 duration-200 ease-linear hover:translate-x-0.5" />
                  </Link>
                </Button>
                <SelectTheme />
              </div>
              <div className="flex items-center gap-2 md:hidden">
                <SelectTheme />
                <NavigationMenu />
              </div>
            </div>
          )}
        </motion.div>
      </section>
    </nav>
  );
};
