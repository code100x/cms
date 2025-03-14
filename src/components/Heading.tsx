'use client';

import { usePathname } from 'next/navigation';
import { Greeting } from './Greeting';

function FormatParam(param: string): string {
  return param.slice(0).split('-').join(' ');
}

interface HeadingProps {
  name: string;
}

function Heading({ name }: HeadingProps) {
  const pathname = usePathname()?.split('/')[1] || '';
  const isHome = pathname.toLowerCase() === 'home';

  return (
    <div className="flex flex-col justify-between gap-4 lg:flex-row">
      <h1 className="flex h-14 items-center text-wrap text-3xl font-extrabold capitalize tracking-tighter md:text-4xl">
        {isHome ? <Greeting name={name} /> : FormatParam(pathname)}
      </h1>
    </div>
  );
}

export default Heading;
