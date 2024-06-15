import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

const PreFooterSection = () => {
  return (
    <div className="my-20 flex w-full flex-col items-center justify-center px-4 py-32 md:px-36">
      <div className="mb-3 flex flex-col items-center justify-center gap-y-2 md:mb-6">
        <h3 className="px-6 text-center text-2xl font-semibold text-neutral-800 dark:text-neutral-200 md:px-24 md:text-4xl">
          Every developer deserves to be a great engineer, a{' '}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text font-semibold text-transparent">
            100xEngineer!
          </span>
        </h3>

        <p className="px-12 text-center text-lg font-medium text-neutral-600 dark:text-neutral-400">
          Give yourself the power you deserve with a 100xdevs today!
        </p>
      </div>

      <Button size={'lg'} className="rounded-full text-lg" asChild>
        <Link
          href={'https://harkirat.classx.co.in/new-courses'}
          target="_blank"
        >
          <p className="text-white">Join now</p>{' '}
          <Sparkles className="ml-2 h-4 w-4 text-white duration-200 ease-linear hover:translate-x-0.5" />
        </Link>
      </Button>
    </div>
  );
};

export default PreFooterSection;
