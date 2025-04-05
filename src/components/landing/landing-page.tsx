'use client';
import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import FooterCTA from './footer-cta';
import Footer from './footer';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const heroFrameRef = useRef(null);

  useEffect(() => {
    if (!heroFrameRef.current) return;

    // Initial clip path setup
    gsap.set(heroFrameRef.current, {
      clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
      borderRadius: '0 0 40% 10%',
    });

    // Animation on scroll
    const animation = gsap.from(heroFrameRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: heroFrameRef.current,
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
    });

    return () => {
      animation.kill();
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <div className="relative h-screen w-full overflow-hidden">
        <div
          ref={heroFrameRef}
          id="hero-frame"
          className="relative z-10 flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-black to-blue-400"
        >
          {/* Hero content */}
          <div className="absolute left-0 top-5 z-40 flex h-full w-full flex-col items-center justify-center px-4">
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
              className="flex max-w-7xl flex-col items-center justify-center gap-2"
            >
              <h1 className="max-w-2xl py-2 text-center text-5xl font-extrabold tracking-tighter text-white md:text-6xl xl:text-7xl">
                <span className="w-fit bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text pr-1.5 text-center text-transparent md:mb-4">
                  100xDevs,
                </span>{' '}
                <span className="bg-gradient-to-b from-white/90 to-white/60 bg-clip-text py-1 text-transparent">
                  because 10x ain&apos;t enough!
                </span>
              </h1>

              <p className="mx-auto text-center text-lg font-medium tracking-tight text-white/80 md:text-xl">
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
              className="mt-8 flex items-center justify-center gap-2 py-5"
            >
              <Button size={'lg'} asChild variant={'branding'}>
                <Link
                  href={'https://harkirat.classx.co.in/new-courses'}
                  target="_blank"
                >
                  Explore Courses
                </Link>
              </Button>
              <Button size={'lg'} asChild>
                <Link href={'https://projects.100xdevs.com'} target="_blank">
                  Explore Notes
                </Link>
              </Button>
            </motion.div>
          </div>

            {/* Decorative text elements with dark mode support */}
            <h1 className="special-font font-head max-w-2xl font-bold absolute bottom-5 right-5 z-40 text-6xl bg-slate-900 bg-clip-text text-transparent md:text-6xl xl:text-7xl">
            100<b>x</b>de<b>v</b>s
          </h1>
        </div>
        <h1 className="special-font font-head max-w-2xl font-bold absolute bottom-5 right-5 text-6xl bg-gradient-to-b from-blue-100 to-blue-300 bg-clip-text text-transparent md:text-6xl xl:text-7xl">
            100<b>x</b>de<b>v</b>s
          </h1>
      </div>

      {/* Moving Cards Section */}
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

      {/* Background gradient */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1,
          delay: 1,
        }}
        className="absolute -bottom-[16rem] -z-[20] size-[24rem] overflow-hidden rounded-full bg-gradient-to-t from-blue-400 to-blue-700 blur-[16em]"
      />

      {/* Footer sections */}
      <FooterCTA />
      <Footer />
    </div>
  );
}