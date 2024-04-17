import Link from 'next/link';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';

const headingFont = localFont({
  src: '../../../../public/fonts/font.woff2',
});

const Logo = ({ onFooter = false }: { onFooter: boolean }) => {
  return (
    <Link href={'/'}>
      <div className="hover:opacity-90 transition flex items-center gap-x-2 mr-16">
        <img
          src={
            'https://d2szwvl7yo497w.cloudfront.net/courseThumbnails/main.png'
          }
          className="rounded-full"
          height={30}
          width={30}
        />
        <p
          className={cn(
            'dark:text-neutral-100 text-neutral-700',
            onFooter ? 'text-3xl text-neutral-200' : 'text-xl',
            headingFont.className,
          )}
        >
          100xdevs
        </p>
      </div>
    </Link>
  );
};

export default Logo;
