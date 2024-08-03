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
            'https://d2szwvl7yo497w.cloudfront.net/courseThumbnails/main.png'
          }
          className="rounded-full"
          height={30}
          width={30}
        />
        <p
          className={cn(
            'text-foreground',
            onFooter ? 'text-3xl text-foreground' : 'text-xl',
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
