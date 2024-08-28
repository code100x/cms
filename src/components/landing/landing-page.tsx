import { cn } from '@/lib/utils';
import { ChevronRight, Medal } from 'lucide-react';
import { Poppins } from 'next/font/google';
import localFont from 'next/font/local';
import Link from 'next/link';
import { Button } from '../ui/button';
import PreFooterSection from './footer/pre-footer/pre-footer';
import DailyCodeSection from './snaps-section/daily-code/daily-code';
import DashboardSection from './snaps-section/dashboard/dashboard-section';
import DiscordSection from './snaps-section/discord-section/discord-section';
import PlatformSection from './snaps-section/platform/platform-section';
import TrustedBySection from './trustedby-section/trusted-by';
import AboutUsSection from './us-section/about-us';
import WhyUsSection from './us-section/why-us';
import { Appbar } from '@/components/Appbar';

const headingFont = localFont({
  src: '../../../public/fonts/font.woff2',
});

const textFont = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Appbar className="fixed z-50" showLogoforLanding={true} />

      <main className="mt-24 flex flex-col items-center justify-center">
        {/* Tagline */}
        <div
          className={cn(
            'flex flex-col items-center justify-center',
            headingFont.className,
          )}
        >
          <div className="md:text-md mb-4 flex items-center rounded-full border bg-blue-50 px-4 py-2.5 font-sans text-sm font-semibold uppercase text-blue-700 shadow-md md:px-5">
            <Medal className="mr-2 h-5 w-5" />
            #1 learning platform
          </div>

          <h1 className="mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-center text-4xl text-transparent md:mb-4 md:text-6xl">
            100xdevs
          </h1>

          <div className="w-fit px-4 pb-4 text-center text-3xl text-neutral-800 dark:text-neutral-200 md:text-6xl">
            because 10x ain&apos;t enough!
          </div>

          <div
            className={cn(
              'mx-auto mt-4 max-w-sm px-2 text-center text-sm text-neutral-400 dark:text-neutral-500 md:max-w-2xl md:text-xl',
              textFont.className,
            )}
          >
            A Beginner-Friendly Platform for Mastering Programming Skills and
            Unleashing Your Inner Developer Genius! Start Learning Today and
            Transform into a Tech Pro Tomorrow!
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2">
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
              See more{' '}
              <ChevronRight className="ml-1 h-4 w-4 text-black duration-200 ease-in-out hover:translate-x-1 dark:text-white" />
            </Link>
          </Button>
        </div>

        {/* Platform */}
        <PlatformSection />

        {/* Trusted by */}
        <TrustedBySection />

        {/* Dashboard */}
        <DashboardSection />

        {/* DailyCode */}
        <DailyCodeSection />

        {/* Why Us? */}
        <WhyUsSection />

        {/* About us */}
        <AboutUsSection />

        {/* Discord Section */}
        <DiscordSection />
        {/* PreFooter Section */}
        <PreFooterSection />
      </main>
    </div>
  );
}
