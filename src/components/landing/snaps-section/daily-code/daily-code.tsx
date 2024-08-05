import Image from 'next/image';
import dailycode from '@public/platform/dailycode.png';
import { Button } from '../../../ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BorderBeam } from '@/components/magicui/border-beam';

const DailyCodeSection = () => {
  return (
    <div className="wrapper my-20 grid w-full grid-cols-1 items-center justify-between gap-12 lg:grid-cols-2">
      <div className="flex w-full flex-col items-start gap-4 px-4 md:px-12">
        <div>
          <h3 className="font-semibold text-foreground/60 md:text-lg">
            <span className="pr-1 text-lg font-bold text-blue-600">|</span>Learn
            through documentations
          </h3>
          <h2 className="text-2xl font-bold tracking-tighter text-foreground md:text-4xl">
            Everything{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Documented.
            </span>
          </h2>
        </div>
        <div className="flex flex-col gap-2">
          <ul className="flex gap-2">
            <div className="size-8 justify-center rounded-full bg-blue-600 p-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </div>
            <span className="text-foreground/80 md:text-lg">
              Revisions after classes made easy, stop worrying about noting down
            </span>
          </ul>
          <ul className="flex gap-2">
            <div className="size-8 justify-center rounded-full bg-blue-600 p-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </div>
            <span className="text-foreground/80 md:text-lg">
              Timestamps and revisiting the recordings, get access to well
              documented slides!
            </span>
          </ul>
          <ul className="flex gap-2">
            <div className="size-8 justify-center rounded-full bg-blue-600 p-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </div>
            <span className="text-foreground/80 md:text-lg">
              Enroll now to experience the importance of learning by
              documentation, learning by tutorials together
            </span>
          </ul>
        </div>

        <Button
          className="mt-6 rounded-full hover:shadow-sm"
          size={'lg'}
          asChild
        >
          <Link href={'https://projects.100xdevs.com'} target="_blank">
            <p className="text-white">Explore Docs</p>{' '}
            <ChevronRight className="ml-1 h-4 w-4 text-white duration-200 ease-in-out hover:translate-x-1" />
          </Link>
        </Button>
      </div>
      <div className="relative h-fit w-fit rounded-2xl transition-all duration-300 hover:-translate-y-2">
        <Image
          src={dailycode}
          alt={'dailycode'}
          className="mx-auto h-full w-full rounded-2xl border-[0.2rem] border-foreground/10 object-cover shadow-xl lg:w-[50vw]"
        />
        <BorderBeam size={100} duration={12} delay={9} />
      </div>
    </div>
  );
};

export default DailyCodeSection;
