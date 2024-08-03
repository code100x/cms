'use client';
import Image from 'next/image';
import platform from '@public/platform/platform.gif';
import React from 'react';
import { BorderBeam } from '@/components/magicui/border-beam';
import { motion } from 'framer-motion';

const PlatformSection = () => {
  return (
    <motion.div
      initial={{
        y: 50,
        scaleY: 0.5,
        filter: 'blur(10px) contrast(0.5) brightness(0.5)',
        opacity: 0,
      }}
      animate={{
        y: 0,
        scaleY: 1,
        filter: 'blur(0px) contrast(1) brightness(1)',
        opacity: 1,
        transition: {
          duration: 0.5,
          ease: 'easeInOut',
        },
      }}
      className="my-20 flex w-full items-center justify-center"
    >
      <div className="relative h-fit w-fit rounded-3xl">
        <Image
          src={platform}
          alt={'platform'}
          className="mx-auto h-full w-full rounded-3xl border-[0.3rem] border-foreground/10 object-cover shadow-xl lg:w-[50vw]"
        />
        <BorderBeam size={200} duration={12} delay={9} />
      </div>
    </motion.div>
  );
};

export default PlatformSection;
