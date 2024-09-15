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
      {/* <Appbar
        showLogoforLanding={true}
        className="fixed top-0 z-50 flex h-16 w-[80%] items-center justify-center gap-2 border-b bg-background/80 px-4 shadow-sm backdrop-blur-md print:hidden"
      /> */}
      <Appbar
        showLogoforLanding={true}
        className="fixed left-1/2 top-5 z-50 flex h-16 w-[80%] -translate-x-1/2 transform items-center justify-center gap-2 rounded-lg border border-b-4 border-r-4 px-4 shadow-sm backdrop-blur-md print:hidden"
      />

      {/* <Hero /> */}

      <main className="item-center flex flex-col items-center justify-center">
        {/* Hero */}

        <div className="bg-a m-4 mx-auto mb-[50px] flex w-[90%] flex-col items-center justify-center md:flex-row md:justify-between">
          <div
            className={cn(
              'flex flex-col items-center md:items-start',
              headingFont.className,
            )}
          >
            <div className="md:text-md mb-4 flex w-full max-w-[250px] items-center rounded-full border bg-blue-50 px-4 py-2.5 text-center font-sans text-sm font-semibold uppercase text-blue-700 shadow-md md:px-5 md:text-left">
              <Medal className="mr-2 h-5 w-5" />
              #1 learning platform
            </div>

            <h1 className="mb-3 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-center text-4xl text-transparent md:mb-4 md:text-left md:text-6xl">
              100xdevs
            </h1>

            <div className="relative w-full pb-4 text-center text-3xl text-neutral-800 dark:text-neutral-200 md:text-left md:text-6xl">
              because 10x ain&apos;t enough!
              {/* <img className="absolute w-[106px] h-5 top-[60px] right-[60px]" alt="Vector" src="./vector1.svg" /> */}
            </div>

            <div
              className={cn(
                'mx-auto mt-4 max-w-sm text-center text-sm text-neutral-400 dark:text-neutral-500 md:mx-0 md:max-w-2xl md:text-left md:text-xl',
                textFont.className,
              )}
            >
              A Beginner-Friendly Platform for Mastering Programming Skills and
              Unleashing Your Inner Developer Genius! Start Learning Today and
              Transform into a Tech Pro Tomorrow!
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col items-center justify-center gap-2 md:flex-row md:justify-start">
              <Button
                className="mt-6 w-full rounded-full hover:shadow-sm md:w-auto"
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
                className="mt-6 w-full rounded-full hover:shadow-sm md:w-auto"
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
          </div>

          <div className="relative mt-8 flex flex-col items-center md:mt-0">
            <img
              src="./image-1.png"
              className="h-auto max-w-[250px] object-cover md:max-w-[392px]"
            />
            {/* <img src='https://github.com/Rahul-Bhati/Slack_Interface/blob/main/img2.png?raw=true' className='absolute max-w-[140px] h-auto top-[50px] left-[-50px]' /> */}
          </div>
        </div>

        {/* <Hero /> */}

        {/* our course */}
        <div className="bg-[#EBEBEB]m-5 flex w-full flex-col items-center justify-center p-[70px]">
          <h1 className="mb-[30px] font-sans text-4xl font-bold">
            Our course are sutiable for ...
          </h1>

          <div className="z-22 flex w-full items-center justify-center">
            <img src="./image-2.png" className="h-auto object-cover" />
          </div>

          <div className="my-6 flex flex-wrap justify-center gap-6 lg:gap-8">
            {/* div 1 */}
            <div className="flex w-full flex-col gap-4 sm:w-[calc(50%-12px)] lg:w-[calc(20%-18px)]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border-b-4 border-r-4 border-yellow-300 bg-white lg:h-16 lg:w-16">
                  <img
                    className="w-6 lg:w-10"
                    src="./award-fill.svg"
                    alt="award svg"
                  />
                </div>
                <div className="text-sm font-extrabold lg:text-base">
                  For Beginners Students
                </div>
              </div>
              <div className="text-xs font-normal lg:text-sm">
                Adipiscing bibendum est ultricies integer. Magnis dis parturient
                montes nascetur ridiculus mus mauris Facilisi nullam vehicula
                ipsum a arcu cursus vitae. Interdum velit laoreet id donec
                ultrices tincidunt arcu
              </div>
            </div>

            {/* div 2 */}
            <div className="flex w-full flex-col gap-4 sm:w-[calc(50%-12px)] lg:w-[calc(20%-18px)]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border-b-4 border-r-4 border-yellow-300 bg-white lg:h-16 lg:w-16">
                  <img
                    className="w-6 lg:w-10"
                    src="./medal-2-fill.svg"
                    alt="award svg"
                  />
                </div>
                <div className="text-sm font-extrabold lg:text-base">
                  Beginners IT Specialists
                </div>
              </div>
              <div className="text-xs font-normal lg:text-sm">
                Adipiscing bibendum est ultricies integer. Magnis dis parturient
                montes nascetur ridiculus mus mauris Facilisi nullam vehicula
                ipsum a arcu cursus vitae. Interdum velit laoreet id donec
                ultrices tincidunt arcu
              </div>
            </div>

            {/* div 3 */}
            <div className="flex w-full flex-col gap-4 sm:w-[calc(50%-12px)] lg:w-[calc(20%-18px)]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border-b-4 border-r-4 border-yellow-300 bg-white lg:h-16 lg:w-16">
                  <img
                    className="w-6 lg:w-10"
                    src="./medal-line.svg"
                    alt="award svg"
                  />
                </div>
                <div className="text-sm font-extrabold lg:text-base">
                  Corporate Customers
                </div>
              </div>
              <div className="text-xs font-normal lg:text-sm">
                Adipiscing bibendum est ultricies integer. Magnis dis parturient
                montes nascetur ridiculus mus mauris Elementum facilisis leo vel
                fringilla est ullamcorper eget nulla facilisi. Imperdiet proin
                ferme
              </div>
            </div>

            {/* div 4 */}
            <div className="flex w-full flex-col gap-4 sm:w-[calc(50%-12px)] lg:w-[calc(20%-18px)]">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg border-b-4 border-r-4 border-yellow-300 bg-white lg:h-16 lg:w-16">
                  <img
                    className="w-6 lg:w-10"
                    src="./bubble-chart-line.svg"
                    alt="award svg"
                  />
                </div>
                <div className="text-sm font-extrabold lg:text-base">
                  Current IT Specialists
                </div>
              </div>
              <div className="text-xs font-normal lg:text-sm">
                Adipiscing bibendum est ultricies integer. Magnis dis parturient
                montes nascetur ridiculus mus mauris Lectus magna fringilla urna
                porttitor rhoncus dolor purus non. Orci dapibus ultrices in
                iaculis
              </div>
            </div>
          </div>
        </div>

        {/* Tagline */}

        {/* <div
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
        </div> */}

        {/* CTA Buttons */}
        {/* <div className="flex items-center gap-2">
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
        </div> */}

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
