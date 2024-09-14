'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import FooterCTA from './footer-cta';
import Footer from './footer';
import { motion } from 'framer-motion';

const heroItems = [
  {
    imageUrl:
      'https://appxcontent.kaxa.in/paid_course3/2024-07-07-0.8201249093606604.png',
  },
  {
    imageUrl: 'https://100x-b-mcdn.akamai.net.in/images/adhoc.jpeg',
  },
  {
    imageUrl:
      'https://appxcontent.kaxa.in/paid_course3/2024-07-09-0.27031454992467685.png',
  },
  {
    imageUrl: 'https://100x-b-mcdn.akamai.net.in/images/ds.jpeg',
  },

  {
    imageUrl:
      'https://appxcontent.kaxa.in/paid_course3/2024-07-09-0.6125162399767927.png',
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex h-[100vh] flex-col items-center justify-center gap-4">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.25,
            type: 'spring',
            damping: 10,
            stiffness: 100,
          }}
          className="flex max-w-7xl flex-col items-center justify-center gap-2 px-4"
        >
          <h1 className="max-w-2xl py-2 text-center text-5xl font-extrabold tracking-tighter md:text-6xl xl:text-7xl">
            <span className="w-fit bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text pr-1.5 text-center text-transparent md:mb-4">
              100xDevs,
            </span>{' '}
            <span className="bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text py-1 text-transparent">
              because 10x ain&apos;t enough!
            </span>
          </h1>

          <p className="mx-auto text-center text-lg font-medium tracking-tight text-primary/80 md:text-xl">
            A beginner-friendly platform for mastering programming skills.
          </p>
        </motion.div>
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            type: 'spring',
            damping: 10,
            stiffness: 100,
          }}
          className="flex items-center justify-center gap-2"
        >
          <Button size={'lg'} asChild variant={'branding'}>
            <Link
              href={'https://harkirat.classx.co.in/new-courses'}
              target="_blank"
            >
              Explore Me
            </Link>
          </Button>
          <Button size={'lg'} asChild>
            <Link href={'https://projects.100xdevs.com'} target="_blank">
              Explore Notes
            </Link>
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.75,
            type: 'spring',
            damping: 10,
            stiffness: 100,
          }}
          className="relative mx-auto my-4 flex w-full flex-col items-center justify-center overflow-hidden antialiased"
        >
          <InfiniteMovingCards items={heroItems} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 1,
          }}
          className="absolute -bottom-[16rem] -z-[20] size-[24rem] overflow-hidden rounded-full bg-gradient-to-t from-blue-400 to-blue-700 blur-[16em]"
        />
      </main>
      <FooterCTA />
      <Footer />
    </div>
  );
}
