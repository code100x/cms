import Image from 'next/image';
import Link from 'next/link';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';

const headingFont = localFont({
  src: '../../../../public/fonts/font.woff2',
});

const LogoLight = () => {
  return (
    <Link href={'/'}>
      <div className="hover:opacity-90 transition flex items-center gap-x-2">
        <Image
          src={'/harkirat.png'}
          alt={'logo'}
          className="rounded-full"
          height={60}
          width={60}
        />
        <p
          className={cn(
            'text-3xl text-neutral-100 pb-1',
            headingFont.className,
          )}
        >
          100xdevs
        </p>
      </div>
    </Link>
  );
};

export default LogoLight;
