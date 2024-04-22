import { CardContainer, CardItem } from '@/components/3dcard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import dailycode from '@public/platform/dailycode.png';

const DailyCodeSection = () => {
  return (
    <div className="w-full flex flex-row-reverse items-center justify-between py-24 my-20 bg-neutral-900 dark:bg-slate-200">
      <div className="w-full flex flex-col items-start justify-center px-4 md:px-12">
        <h3 className="font-medium text-sm text-neutral-200 dark:text-neutral-800">
          <span className="font-bold text-blue-600 pr-1 text-lg">|</span>
          Everything Documented
        </h3>
        <h2 className="text-2xl md:text-4xl font-semibold text-neutral-100 dark:text-neutral-900 mt-2 mb-6">
          Learn through documentations
        </h2>
        <p className="text-lg text-neutral-100 dark:text-neutral-800  font-medium mb-4">
          Revisions after classes made easy, stop worrying about noting down
          timestamps and revisiting the recordings, get access to well
          documented slides!
        </p>
        <p className="text-lg text-neutral-200 dark:text-neutral-600 font-medium my-2">
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
            <ChevronRight className="text-white h-4 w-4 ml-1 hover:translate-x-1 ease-in-out duration-200 " />
          </Link>
        </Button>
      </div>

      <CardContainer className="w-full cursor-pointer">
        <Link href="https://projects.100xdevs.com" target="_blank">
          <div className="hidden md:block py-3 pr-3 md:py-6 md:pr-6 rounded-r-xl md:rounded-r-2xl bg-neutral-800 shadow-2xl">
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
