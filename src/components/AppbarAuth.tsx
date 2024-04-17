'use client';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';
//import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { History, LogOut, NotebookPen, School } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { JoinDiscord } from './JoinDiscord';
import DiscordIcon from './assets/discordIcon';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export const AppbarAuth = ({ isInMenu = false }: { isInMenu?: boolean }) => {
  const session = useSession();
  const router = useRouter();
  let firstLetterOftheName = '';

  if (session && session.data && session.data.user && session.data.user.name) {
    firstLetterOftheName = session.data.user.name[0].toUpperCase();
  }

  if (!session.data?.user) {
    return (
      <Button
        size={'sm'}
        variant={isInMenu ? 'navLink' : 'outline'}
        id="navbar-default"
        onClick={() => {
          signIn();
        }}
      >
        Sign In
      </Button>
    );
  }

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="iconSM" className="bg-red-400">
          <span className="sr-only">Toggle theme</span>
          {session.data.user.image
            ? session.data.user.image
            : firstLetterOftheName}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="z-[200]">
        <DropdownMenuItem className="flex items-center">
          <Link
            href={'https://projects.100xdevs.com/'}
            className="flex items-center"
          >
            <NotebookPen className="size-4" />
            <span className="pl-2">Slides</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem className="flex items-center">
          <Link
            href={'https://github.com/100xdevs-cohort-2/assignments/'}
            className="flex items-center"
          >
            <School className="size-4" />{' '}
            <span className="pl-2">Assignments</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center">
          <Link href={'/history'} className="flex items-center">
            <History className="size-4" />{' '}
            <span className="pl-2">Watch History</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <DiscordIcon />
          <div className="ml-2">
            <JoinDiscord isNavigated={false} />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className=""
          onClick={(e) => {
            e.stopPropagation();
            signOut();
            router.push('/');
          }}
        >
          <LogOut className="size-4" />
          <span className="pl-2"> Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
