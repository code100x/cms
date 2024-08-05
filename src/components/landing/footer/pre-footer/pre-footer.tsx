import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

const PreFooterSection = () => {
  return (
    <div className="flex h-[45vh] w-full justify-end rounded-3xl bg-blue-800 p-8">
      <div className="flex flex-col justify-between md:flex-row md:items-end">
        <div className="flex flex-col gap-2 md:w-[70%]">
          <h3 className="text-2xl font-bold text-white md:text-4xl">
            Every developer deserves to be a great engineer, a 100xEngineer!
            {/* <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text font-bold text-transparent"></span> */}
          </h3>

          <p className="text-lg text-white/80">
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
    </div>
  );
};

export default PreFooterSection;
