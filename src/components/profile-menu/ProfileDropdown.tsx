'use client';

import Link from 'next/link';
import {
  BookmarkIcon,
  HistoryIcon,
  LogOutIcon,
  User2Icon,
  Bird,
  CreditCard,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ExternalLinks from './ExternalLinks';
import { signOut } from 'next-auth/react';

const ProfileDropdown = () => {
  const menuItemLinks = [
    {
      href: '/history',
      icon: <HistoryIcon className="mr-2 h-4 w-4" />,
      label: 'Watch History',
    },
    {
      href: '/bookmarks',
      icon: <BookmarkIcon className="mr-2 h-4 w-4" />,
      label: 'Bookmarks',
    },
    {
      href: '/questions',
      icon: <Bird className="mr-2 h-4 w-4" />,
      label: 'Questions',
    },
    {
      href: '/payout-methods',
      icon: <CreditCard className="mr-2 h-4 w-4" />,
      label: 'Payout Methods',
    },
  ];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 md:h-10 md:w-10">
          <User2Icon className="h-4 w-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-3 mt-2 w-56 shadow-2xl">
        <DropdownMenuGroup>
          {menuItemLinks.map(({ href, label, icon }) => (
            <Link href={href} key={href}>
              <DropdownMenuItem>
                {icon}
                <span>{label}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <ExternalLinks />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            signOut();
          }}
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
