import Image from 'next/image';
import dashboard from '@public/platform/dashboard.png';
import { Button } from '@repo/ui/shad/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { CardContainer, CardItem } from '@/components/3dcard';

const DashboardSection = () => {
  return (
    <div className="my-20 flex w-full items-center justify-between">
      <div className="flex w-full flex-col items-start justify-center px-4 md:px-12">
        <h3 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          <span className="pr-1 text-lg font-bold text-blue-600">|</span>The
          best learning platform!
        </h3>
        <h2 className="mb-6 mt-2 text-2xl font-semibold text-neutral-800 dark:text-neutral-200 md:text-4xl">
          What is 100xdevs?
        </h2>
        <p className="text-lg font-medium text-neutral-600 dark:text-neutral-400">
          100xDevs, a learning platform that offers courses on the latest trends
          in the software engineering industry. Whether you&apos;re a beginner
          or looking to upgrade your skills, 100xDevs provides a user-friendly
          environment for mastering the essentials of programming. Stay ahead of
          the curve by exploring courses curated by industry engineers.
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
        <Link href="" target="_blank">
          <div className="hidden rounded-l-xl bg-slate-200 py-3 pl-3 dark:bg-slate-800 md:block md:rounded-l-2xl md:py-6 md:pl-6">
            <CardItem>
              <Image
                src={dashboard}
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

export default DashboardSection;
