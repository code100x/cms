import { Button } from '@repo/ui/shad/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import discord from '@public/platform/discord.png';
import { CardContainer, CardItem } from '@/components/3dcard';

const DiscordSection = () => {
  return (
    <div className="my-20 flex w-full items-center justify-between bg-neutral-900 py-32 dark:bg-slate-200">
      <div className="flex w-full flex-col items-start justify-center px-4 md:px-12">
        <h3 className="text-sm font-medium text-neutral-200 dark:text-neutral-800">
          <span className="pr-1 text-lg font-bold text-blue-600">|</span>Discord
          Support
        </h3>
        <h2 className="mb-6 mt-2 text-2xl font-semibold text-neutral-100 dark:text-neutral-900 md:text-4xl">
          Never miss on anything!
        </h2>
        <p className="mb-4 text-lg font-medium text-neutral-100 dark:text-neutral-800">
          Personal TAs make it easy for you to get your doubts solved within
          minutes. Got any doubt? Ask on the discord community.
        </p>
        <p className="my-2 text-lg font-medium text-neutral-200 dark:text-neutral-600">
          Facing any issues while setting up the environment? Get it fixed, Ask
          on the discord communtiy!
        </p>

        <Button
          className="mt-6 rounded-full hover:shadow-sm"
          size={'lg'}
          asChild
        >
          <Link
            href={'https://harkirat.classx.co.in/new-courses'}
            target="_blank"
          >
            <p className="text-white">Explore courses</p>{' '}
            <ChevronRight className="ml-1 h-4 w-4 text-white duration-200 ease-in-out hover:translate-x-1" />
          </Link>
        </Button>
      </div>
      <CardContainer className="w-full cursor-pointer">
        <Link href="https://discord.gg/pusrVQsFbQ" target="_blank">
          <div className="hidden rounded-l-xl bg-neutral-800 py-3 pl-3 shadow-2xl md:block md:rounded-l-2xl md:py-6 md:pl-6">
            <CardItem>
              <Image
                src={discord}
                alt={'platform'}
                width={1400}
                height={1260}
                className="rounded-l-lg md:rounded-l-xl"
              />
            </CardItem>
          </div>
        </Link>
      </CardContainer>
    </div>
  );
};

export default DiscordSection;
