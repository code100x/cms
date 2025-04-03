'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Menu, Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { AppbarAuth } from './AppbarAuth';
import ThemeToggler from './ThemeToggler';
import ProfileDropdown from './profile-menu/ProfileDropdown';
import { SearchBar } from './search/SearchBar';

export const Navbar = () => {
  // Basic state for user session and navigation
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  
  // State for menu and search toggles
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Create a reference to the navbar container element
  const navbarRef = useRef<HTMLDivElement>(null);
  
  // State for controlling navbar visibility
  const [showNavbar, setShowNavbar] = useState(true);
  const [previousScrollPosition, setPreviousScrollPosition] = useState(0);

  // Function to handle opening/closing the menu
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  
  // Function to handle opening/closing the search
  function toggleSearch() {
    setIsSearchOpen(!isSearchOpen);
  }

  // This runs when the user scrolls
  useEffect(() => {
    function handleScroll() {
      // Get current scroll position
      const currentScrollPosition = window.scrollY;
      
      // At the top of the page
      if (currentScrollPosition === 0) {
        setShowNavbar(true);
        // Remove floating style if navbar exists
        if (navbarRef.current) {
          navbarRef.current.classList.remove('floating-nav');
        }
      } else if (currentScrollPosition > previousScrollPosition) {
        setShowNavbar(false);
        // Add floating style if navbar exists
        if (navbarRef.current) {
          navbarRef.current.classList.add('floating-nav');
        }
      } else if (currentScrollPosition < previousScrollPosition) {
        setShowNavbar(true);
        // Add floating style if navbar exists
        if (navbarRef.current) {
          navbarRef.current.classList.add('floating-nav');
        }
      }
      
      // Save current position for next comparison
      setPreviousScrollPosition(currentScrollPosition);
    }

    // Add scroll listener when component mounts
    window.addEventListener('scroll', handleScroll);
    
    // Remove scroll listener when component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [previousScrollPosition]);

  // Show or hide navbar based on scroll direction
  useEffect(() => {
    if (navbarRef.current) {
      if (showNavbar) {
        // Show navbar
        navbarRef.current.style.transform = 'translateY(0)';
        navbarRef.current.style.opacity = '1';
      } else {
        // Hide navbar
        navbarRef.current.style.transform = 'translateY(-100%)';
        navbarRef.current.style.opacity = '0';
      }
    }
  }, [showNavbar]);

  // Animation settings for navbar items
  const navItemAnimations = {
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
    <>
      {/* Main navbar container */}
      <div 
        ref={navbarRef} 
        className="fixed inset-x-0 top-4 z-[999] h-auto transition-all duration-300 sm:inset-x-6"
      >
        {/* Navbar with animations */}
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            type: 'spring',
            damping: 10,
            stiffness: 100,
          }}
          className="w-full rounded-lg border border-primary/10 bg-background/90 backdrop-blur-md shadow-lg"
        >
          {/* Navbar content */}
          <div className="wrapper flex w-full items-center justify-between p-3">
            {/* Left side - Logo and back button */}
            <motion.div
              className="flex items-center gap-4"
              initial="hidden"
              animate="visible"
              variants={navItemAnimations}
              custom={0}
            >
              {/* Back button - only shows for logged in users not on home page */}
              {session?.user && pathname !== '/home' && (
                <Button
                  onClick={() => router.back()}
                  variant={'ghost'}
                  size={'icon'}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="size-6" />
                </Button>
              )}
              
              {/* Logo and site name */}
              <Link href={'/'} className="flex items-center gap-2">
                <img
                  src={
                    'https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg'
                  }
                  alt="100xDevs Logo"
                  className="size-10 rounded-full"
                />
                <p
                  className={`hidden bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text text-2xl font-black tracking-tighter text-transparent min-[410px]:block`}
                >
                  100xDevs
                </p>
              </Link>
            </motion.div>

            {/* Right side - Search, theme, profile */}
            <motion.div
              className="flex items-center gap-4"
              initial="hidden"
              animate="visible"
              variants={navItemAnimations}
              custom={1}
            >
              {/* Search Bar - only for logged in users */}
              {session?.user && (
                <>
                  {/* Desktop search */}
                  <div className="hidden md:block">
                    <SearchBar />
                  </div>
                  {/* Mobile search button */}
                  <div className="md:hidden">
                    <Button
                      onClick={toggleSearch}
                      variant={'ghost'}
                      size={'icon'}
                      className="mr-2"
                    >
                      <Search className="size-6" />
                    </Button>
                  </div>
                </>
              )}

              {/* Theme toggle button */}
              <ThemeToggler />
              
              {/* User profile dropdown - only for logged in users */}
              {session?.user && <ProfileDropdown />}

              {/* Login/signup for logged out users */}
              {!session?.user && (
                <>
                  {/* Mobile menu button */}
                  <Button
                    onClick={toggleMenu}
                    variant={'ghost'}
                    size={'icon'}
                    className="md:hidden"
                  >
                    <Menu className="size-6" />
                  </Button>
                  
                  {/* Desktop auth buttons */}
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

          {/* Mobile menu - shows when menu button is clicked */}
          <AnimatePresence>
            {!session?.user && isMenuOpen && (
              <motion.div
                className="bg-background/90 backdrop-blur-md p-4 rounded-b-lg md:hidden"
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
          </AnimatePresence>
        </motion.nav>
      </div>

      {/* Mobile search overlay - shows when search is opened on mobile */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[1000] flex flex-col bg-background p-4 md:hidden"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Search</h2>

              <Button variant="ghost" size="icon" onClick={toggleSearch}>
                <X className="size-6" />
              </Button>
            </div>

            <SearchBar onCardClick={toggleSearch} isMobile />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};