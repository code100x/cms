'use client';
import { cn } from '@/lib/utils';
import { ChevronRight, Medal } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';
import PreFooterSection from './footer/pre-footer/pre-footer';
import DailyCodeSection from './snaps-section/daily-code/daily-code';
import DashboardSection from './snaps-section/dashboard/dashboard-section';
import PlatformSection from './snaps-section/platform/platform-section';
import AboutUsSection from './us-section/about-us';
import WhyUsSection from './us-section/why-us';
import { Spotlight } from './spotlight';
import { motion } from 'framer-motion';

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const textVariants = {
    hidden: {
      y: 50,
      scaleY: 0.5,
      filter: 'blur(10px) contrast(0.5) brightness(0.5)',
      opacity: 0,
    },
    visible: {
      y: 0,
      scaleY: 1,
      filter: 'blur(0px) contrast(1) brightness(1)',
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <main className="wrapper flex flex-col items-center justify-center overflow-y-hidden">
      {/* Hero*/}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className={cn('flex flex-col items-center justify-center antialiased')}
      >
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="blue"
        />
        <motion.div
          variants={textVariants}
          className="mb-4 flex items-center rounded-full border bg-blue-50 px-4 py-2.5 text-sm font-semibold uppercase text-blue-700 shadow-md md:px-5"
        >
          <Medal className="mr-2 h-5 w-5" />
          #1 learning platform
        </motion.div>

        <h1 className="flex w-fit flex-col gap-2 text-center text-4xl font-bold leading-none tracking-tighter text-foreground md:text-6xl">
          <motion.span
            variants={textVariants}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            100xdevs,
          </motion.span>
          <motion.span variants={textVariants}>
            because 10x ain&apos;t enough!
          </motion.span>
        </h1>

        <motion.div
          variants={textVariants}
          className="flex flex-col items-center"
        >
          <p
            className={cn(
              'mx-auto mt-4 items-center px-2 text-center text-sm font-light text-foreground/80 md:max-w-2xl md:text-xl',
            )}
          >
            A Beginner-Friendly Platform for Mastering Programming Skills and
            Unleashing Your Inner Developer Genius! Start Learning Today and
            Transform into a Tech Pro Tomorrow!
          </p>
          <div className="flex items-center gap-2">
            {/* CTA Buttons */}
            <Button
              className="mt-6 rounded-full hover:shadow-sm"
              size={'lg'}
              asChild
            >
              <Link
                href={'https://harkirat.classx.co.in/new-courses'}
                target="_blank"
              >
                <p className="text-white">Explore courses</p>
              </Link>
            </Button>

            <Button
              className="mt-6 rounded-full hover:shadow-sm"
              size={'lg'}
              variant={'outline'}
              asChild
            >
              <Link href={'#trustedby'}>
                Know more{' '}
                <ChevronRight className="ml-1 h-4 w-4 text-black duration-200 ease-in-out hover:translate-x-1 dark:text-white" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>

      {/* Platform */}
      <PlatformSection />

      {/* Dashboard */}
      <DashboardSection />

      {/* About us */}
      <AboutUsSection />

      {/* Why Us? */}
      <WhyUsSection />

      {/* DailyCode */}
      <DailyCodeSection />

      {/* PreFooter Section */}
      <PreFooterSection />
    </main>
  );
}
