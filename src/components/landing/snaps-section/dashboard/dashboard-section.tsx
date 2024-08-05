import Image from 'next/image';
import dashboard from '@public/platform/dashboard.png';
import { Button } from '../../../ui/button';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { BorderBeam } from '@/components/magicui/border-beam';

const DashboardSection = () => {
  return (
    <div className="wrapper my-20 grid w-full grid-cols-1 items-center justify-between gap-8 lg:grid-cols-2">
      <div className="flex w-full flex-col items-start gap-8 px-4 md:px-12">
        <div>
          <h3 className="font-semibold text-foreground/60 md:text-lg">
            <span className="pr-1 text-lg font-bold text-blue-600">|</span>The
            best learning platform!
          </h3>
          <h2 className="text-2xl font-bold tracking-tighter text-foreground md:text-4xl">
            What is{' '}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              100xdevs?
            </span>
          </h2>
        </div>
        <p className="text-lg text-foreground/80">
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
      <div className="relative h-fit w-fit rounded-2xl transition-all duration-300 hover:-translate-y-2">
        <Image
          src={dashboard}
          alt={'dashboard'}
          className="mx-auto h-full w-full rounded-2xl border-[0.2rem] border-foreground/10 object-cover shadow-xl lg:w-[50vw]"
        />
        <BorderBeam size={100} duration={12} delay={9} />
      </div>
    </div>
  );
};

export default DashboardSection;
