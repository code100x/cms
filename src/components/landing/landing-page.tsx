'use client';
import Link from 'next/link';
import { Button } from '../ui/button';
// import { InfiniteMovingCards } from '../ui/infinite-moving-cards';
import FooterCTA from './footer-cta';
import Footer from './footer';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, ScrollControls } from '@react-three/drei';
import MacContainer from '../ui/MacContainer';
import Cylinder from '../ui/Cylinder';
const cameraProp1 = { fov: 10, position: [0, 0, 210] } as any;
const cameraProp2={fov: 30} as any;
export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex h-full flex-col">
        {/* Row container for left & right halves */}
        <div className="flex flex-row w-full h-screen">
          {/* Left Side: Hero Text */}
          <div className="w-1/2 flex flex-col items-start justify-center px-8">
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
              className="max-w-xl"
            >
              <h1 className="py-2 pt-36 text-left text-5xl font-extrabold tracking-tighter md:text-6xl xl:text-7xl">
                <span className="w-fit bg-gradient-to-b from-blue-400 to-blue-700 bg-clip-text pr-1.5 text-transparent">
                  100xDevs,
                </span>{' '}
                <span className="bg-gradient-to-b from-primary/90 to-primary/60 bg-clip-text py-1 text-transparent">
                  because 10x ain&apos;t enough!
                </span>
              </h1>
              <p className="text-lg font-medium tracking-tight text-primary/80 md:text-xl mb-10">
                A beginner-friendly platform for mastering programming skills.
              </p>

              <Button size={'lg'} asChild variant={'branding'}>
            <Link
              href={'https://harkirat.classx.co.in/new-courses'}
              target="_blank"
            >
              Explore Courses
            </Link>
          </Button>
            </motion.div>
          </div>

          {/* Right Side: 3D Model */}
          <div
            className="w-1/2 flex items-center justify-center"
            style={{ overflow: 'hidden' }}
          >
            <Canvas
              style={{ width: '90%', height: '80%' }}
              camera={cameraProp1}
            >
              <Environment
                files={[
                  'https://dl.polyhaven.org/file/ph-assets/HDRIs/exr/4k/studio_small_09_4k.exr',
                ]}
              />
              <ScrollControls>
                <group position={[0, 0, 0]}>
                  <MacContainer />
                </group>
              </ScrollControls>
            </Canvas>
          </div>
        </div>
        
        <Link
      href="https://harkirat.classx.co.in/new-courses"
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        textDecoration: 'none', // remove underline if needed
      }}
    >

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Canvas style={{ width: '100%', height: '100%' }} camera={cameraProp2}>
          <ambientLight />
          <Cylinder />
        </Canvas>
      </div>

      <div
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
        }}
      >
        <h2
          style={{
            color: '#fff',
            fontSize: '3rem',
            textAlign: 'left',
            lineHeight: 1.2,
          }}
          
        >
          Keep pushing your limits.
          <br />
          Code, build, and conquer!
        </h2>
      </div>
    </Link>
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
          className="flex items-center justify-center gap-2 py-5"
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
        </motion.div>
        {/* Footer */}

        <FooterCTA/>
        <Footer />
      </main>
    </div>
  );
}
