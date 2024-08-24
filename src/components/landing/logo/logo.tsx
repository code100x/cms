import Link from 'next/link';
import localFont from 'next/font/local';
import { cn } from '@/lib/utils';

const headingFont = localFont({
  src: '../../../../public/fonts/font.woff2',
});

const Logo = ({ onFooter = false }: { onFooter: boolean }) => {
  return (
    <Link href={'/'}>
      <div className="flex items-center gap-x-2 transition hover:opacity-90">
        <img
          src={
            '/harkirat.png'
          }
          className="rounded-full"
          height={30}
          width={30}
        />
        <p
          className={cn(
            'text-neutral-700 dark:text-neutral-100',
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
