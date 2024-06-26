'use client';
import Image from 'next/image';
import platform from '@public/platform/platform.png';
import React from 'react';
import { CardContainer, CardItem } from '@/components/3dcard';
import Link from 'next/link';

const PlatformSection = () => {
  return (
    <CardContainer className="w-full cursor-pointer">
      <Link href="https://harkirat.classx.co.in/new-courses" target="_blank">
        {/* // <CardBody className="relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full sm:w-[30rem] h-auto rounded-xl p-6 border  "> */}
        <div className="my-20 flex w-full items-center justify-center">
          <div className="mx-2 rounded-xl border bg-gradient-to-t from-slate-300 to-slate-400 p-3 shadow-xl md:rounded-2xl md:p-6 dark:from-slate-700 dark:to-slate-600">
            <CardItem translateZ="100" className="mt-4 w-full">
              <Image
                src={platform}
                alt={'platform'}
                width={1080}
                height={1920}
                className="rounded-lg border-2 border-slate-600 md:rounded-xl"
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
