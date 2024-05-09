import React from 'react';
import { Button } from './ui/button';
import Link from 'next/link';
import { JoinDiscord } from './JoinDiscord';
import { DrawerClose } from './ui/drawer';

interface AppbarButtonProps {
  url: string;
  children: React.ReactNode;
  className?: string;
  value?: string;
  asChild?: boolean;
}
export const AppbarButton: React.FC<AppbarButtonProps> = ({
  url,
  children,
  className,
}) => {
  return (
    <Button className={className} variant="link" size={'sm'} asChild>
      <Link href={url}>{children}</Link>
    </Button>
  );
};
export const DiscordButton = () => {
  return (
    <Button variant={'link'} size={'sm'} asChild>
      <JoinDiscord isNavigated={false} />
    </Button>
  );
};

export const NavbarButton: React.FC<AppbarButtonProps> = ({
  url,
  children,
  className,
  value,
  asChild,
}) => {
  return (
    <Button className={className} size={'lg'} variant={'navLink'} asChild>
      <DrawerClose asChild={asChild}>
        <Link href={url} target={value}>
          {children}
        </Link>
      </DrawerClose>
    </Button>
  );
};

export const NavButton = () => {
  return (
    <>
      <div className="block sm:hidden">
        <Button variant={'navLink'} size={'lg'} asChild>
          <DrawerClose asChild>
            <JoinDiscord isInMenu={true} isNavigated={false} />
          </DrawerClose>
        </Button>
      </div>
      <Button
        className={'block sm:hidden'}
        size={'lg'}
        variant={'navLink'}
        asChild
      >
        <DrawerClose>
          <Link href={'https://projects.100xdevs.com/'} target="_blank">
            Slides
          </Link>
        </DrawerClose>
      </Button>

      <Button
        className={'block custom-breakpoint1:hidden'}
        size={'lg'}
        variant={'navLink'}
        asChild
      >
        <DrawerClose>
          <Link
            href={'https://github.com/100xdevs-cohort-2/assignments'}
            target="_blank"
          >
            Assignments
          </Link>
        </DrawerClose>
      </Button>
    </>
  );
};

export const AppButtons = () => {
  return (
    <>
      <Button className={''} size={'sm'} variant={'link'} asChild>
        <Link href={'https://projects.100xdevs.com/'} target="_blank">
          Slides
        </Link>
      </Button>

      <Button
        className={'hidden custom-breakpoint1:inline'}
        size={'sm'}
        variant={'link'}
        asChild
      >
        <Link
          href={'https://github.com/100xdevs-cohort-2/assignments'}
          target="_blank"
        >
          Assignments
        </Link>
      </Button>
    </>
  );
};
