import { cn } from '@/lib/utils';
import localFont from 'next/font/local';
import Link from 'next/link';

const headingFont = localFont({
  src: '../../../../public/fonts/font.woff2',
});

const Logo = ({
  onFooter = false,
  label = '100xdevs',
}: {
  onFooter: boolean;
  label?: string;
}) => {
  return (
    <Link href={'/'}>
      <div className="flex items-center gap-x-2 transition hover:opacity-90">
        <img
          src={
            'https://d2szwvl7yo497w.cloudfront.net/courseThumbnails/main.png'
          }
          className="rounded-full"
          height={30}
          width={30}
        />
        {label && (
          <p
            className={cn(
              'text-neutral-700 dark:text-neutral-100',
              onFooter ? 'text-3xl text-neutral-200' : 'text-xl',
              headingFont.className,
            )}
          >
            {label}
          </p>
        )}
      </div>
    </Link>
  );
};

export default Logo;
