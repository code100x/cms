'use client';
import Image from 'next/image';
import platform from '../../../../../public/platform/platform.png';
import React from 'react';
import { CardContainer, CardItem } from '@/components/3dcard';
import Link from 'next/link';

const PlatformSection = () => {
  return (
    <CardContainer className="w-full cursor-pointer">
      <Link href="https://harkirat.classx.co.in/new-courses" target="_blank">
        {/* // <CardBody className="relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[30rem] h-auto rounded-xl p-6 border  "> */}
        <div className="w-full flex items-center justify-center my-20">
          <div className="mx-2 p-3 md:p-6 bg-gradient-to-t from-slate-300 dark:from-slate-700 to-slate-400 dark:to-slate-600 rounded-xl md:rounded-2xl border shadow-xl">
            <CardItem translateZ="100" className="w-full">
              <Image
                src={platform}
                alt={'platform'}
                width={1080}
                height={1920}
                className="rounded-lg md:rounded-xl border-2 border-slate-600"
              />
            </CardItem>
          </div>
        </div>
        {/* </CardBody> */}
      </Link>
    </CardContainer>
  );
};

export default PlatformSection;
