import { MenuIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import Image from 'next/image';
import Menu from './menu-options';

type SheetMenuProps = {
  className?: string;
};

export const SheetMenu = ({ className }: SheetMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger
        aria-label="sidebar trigger"
        asChild
        className={cn(
          'fixed left-2 top-2 z-[100] flex rounded-full lg:!hidden',
          className,
        )}
      >
        <Button
          aria-label="menu icon"
          className="rounded-full"
          variant="outline"
          size={'icon'}
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        showX
        className="z-[101] flex h-full w-[300px] flex-col px-3"
        side="left"
      >
        <SheetHeader>
          <AspectRatio ratio={16 / 5} className="mb-3 rounded-full md:mb-5">
            <Image
              src={
                'https://d2szwvl7yo497w.cloudfront.net/courseThumbnails/main.png'
              }
              unoptimized
              alt="Sidebar Logo"
              fill
              className="rounded-full object-contain"
            />
          </AspectRatio>
          <p className="mb-1 flex flex-col items-center justify-center text-center md:mb-2 lg:mb-4">
            100xDevs
          </p>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
};
