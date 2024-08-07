import { CardContainer, CardItem } from '@/components/3dcard';
import { Button } from '@repo/ui/shad/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import dailycode from '@public/platform/dailycode.png';

const DailyCodeSection = () => {
  return (
    <div className="my-20 flex w-full flex-row-reverse items-center justify-between bg-neutral-900 py-24 dark:bg-slate-200">
      <div className="flex w-full flex-col items-start justify-center px-4 md:px-12">
        <h3 className="text-sm font-medium text-neutral-200 dark:text-neutral-800">
          <span className="pr-1 text-lg font-bold text-blue-600">|</span>
          Everything Documented
        </h3>
        <h2 className="mb-6 mt-2 text-2xl font-semibold text-neutral-100 md:text-4xl dark:text-neutral-900">
          Learn through documentations
        </h2>
        <p className="mb-4 text-lg font-medium text-neutral-100 dark:text-neutral-800">
          Revisions after classes made easy, stop worrying about noting down
          timestamps and revisiting the recordings, get access to well
          documented slides!
        </p>
        <p className="my-2 text-lg font-medium text-neutral-200 dark:text-neutral-600">
          Enroll now to experience the importance of learning by documentation,
          learning by tutorials together.
        </p>

        <Button
          className="mt-6 rounded-full hover:shadow-sm"
          size={'lg'}
          asChild
        >
          <Link href={'https://projects.100xdevs.com'} target="_blank">
            <p className="text-white">See more</p>{' '}
            <ChevronRight className="ml-1 h-4 w-4 text-white duration-200 ease-in-out hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      <CardContainer className="w-full cursor-pointer">
        <Link href="https://projects.100xdevs.com" target="_blank">
          <div className="hidden rounded-r-xl bg-neutral-800 py-3 pr-3 shadow-2xl md:block md:rounded-r-2xl md:py-6 md:pr-6">
            <CardItem>
              <Image
                src={dailycode}
                alt={'dailycode'}
                width={1400}
                height={1260}
                className="rounded-r-lg md:rounded-r-xl"
              />
            </CardItem>
          </div>
        </Link>
      </CardContainer>
    </div>
  );
};

export default DailyCodeSection;
