'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, SidebarClose, SidebarOpen } from 'lucide-react';
import { Button } from './ui/button';
import { AppbarAuth } from './AppbarAuth';
import { SelectTheme } from './ThemeToggler';
import ProfileDropdown from './profile-menu/ProfileDropdown';
import { useRecoilState } from 'recoil';
import { appbarOpen as appbarOpenAtom } from '@/store/atoms/appbar';

export const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAppbarOpen, setIsAppbarOpen] = useRecoilState(appbarOpenAtom);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleAppbar = () => setIsAppbarOpen((prev) => !prev);

  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    }),
  };

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          type: 'spring',
          damping: 10,
          stiffness: 100,
        }}
        className="w-full border-b bg-background"
      >
        <div className="wrapper flex w-full items-center justify-between p-3">
          <motion.div
            className="flex items-center gap-4"
            initial="hidden"
            animate="visible"
            variants={navItemVariants}
            custom={0}
          >
            {session?.user && (
              <motion.button
                onClick={toggleAppbar}
                className="hidden items-center rounded-lg bg-blue-600/5 p-3 text-center transition-all duration-300 hover:bg-blue-600/10 hover:text-blue-500 md:flex"
              >
                {isAppbarOpen ? (
                  <SidebarClose className="size-6" />
                ) : (
                  <SidebarOpen className="size-6" />
                )}
              </motion.button>
            )}
            <Link href={'/'} className="flex items-center gap-2">
              <img
                src={
                  'https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg'
                }
                alt="100xDevs Logo"
                className="size-10 rounded-full"
              />
              <p
                className={`hidden bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-2xl font-black tracking-tighter text-transparent min-[375px]:block`}
              >
                100xDevs
              </p>
            </Link>
          </motion.div>

          <motion.div
            className="flex items-center gap-4"
            initial="hidden"
            animate="visible"
            variants={navItemVariants}
            custom={1}
          >
            <SelectTheme text={false} />
            {session?.user && <ProfileDropdown />}

            {!session?.user && (
              <>
                <Button
                  onClick={toggleMenu}
                  variant={'ghost'}
                  size={'icon'}
                  className="md:hidden"
                >
                  <Menu className="size-6" />
                </Button>
                <div className="hidden items-center gap-2 md:flex">
                  <AppbarAuth />
                  <Button variant={'branding'}>
                    <Link
                      href={'https://harkirat.classx.co.in/new-courses'}
                      target="_blank"
                    >
                      Join now
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </div>

        {/* Mobile menu */}
        {!session?.user && (
          <>
            {isMenuOpen && (
              <motion.div
                className="bg-background p-4 md:hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <motion.div
                  className="flex gap-2"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <AppbarAuth />
                  <Button variant={'branding'} className="w-full">
                    <Link
                      href={'https://harkirat.classx.co.in/new-courses'}
                      target="_blank"
                    >
                      Join now
                    </Link>
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </>
        )}
      </motion.nav>
    </AnimatePresence>
  );
};
