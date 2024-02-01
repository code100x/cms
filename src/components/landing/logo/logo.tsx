import Image from 'next/image';
import Link from 'next/link';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';

const headingFont = localFont({
  src: '../../../../public/fonts/font.woff2',
});

const Logo = () => {
  return (
    <Link href={'/'}>
      <div className="hover:opacity-90 transition flex items-center gap-x-2">
        <Image
          src={'/harkirat.png'}
          alt={'logo'}
          className="rounded-full"
          height={30}
          width={30}
        />
        <p className={cn('text-xl text-neutral-700', headingFont.className)}>
          100xdevs
        </p>
      </div>
    </Link>
  );
};

export default Logo;
