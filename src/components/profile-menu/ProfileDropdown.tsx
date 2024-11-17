'use client';

import Link from 'next/link';
import {
  CreditCard,
  Calendar,
  CircleDollarSign,
  User,
  LogOut,
  Bookmark,
  History,
  MessageSquare,
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
      href: '/watch-history',
      icon: <History className="size-4" />,
      label: 'Watch History',
    },
    {
      href: '/bookmark',
      icon: <Bookmark className="size-4" />,
      label: 'Bookmarks',
    },
    {
      href: '/question',
      icon: <MessageSquare className="size-4" />,
      label: 'Questions',
    },
    {
      href: '/payout-methods',
      icon: <CreditCard className="size-4" />,
      label: 'Payout Methods',
    },
    {
      href: '/bounty',
      icon: <CircleDollarSign className="size-4" />,
      label: 'Bounty',
    },
    {
      href: '/calendar',
      icon: <Calendar className="size-4" />,
      label: 'Calendar',
    },
  ];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-blue-400 to-blue-700">
          <User color="white" className="size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[99999] m-2 min-w-44 bg-neutral-100 dark:bg-neutral-900">
        <DropdownMenuGroup>
          {menuItemLinks.map(({ href, label, icon }) => (
            <Link href={href} key={href}>
              <DropdownMenuItem className="flex gap-2 text-base">
                {icon}
                <span>{label}</span>
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>

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
          <span
            className={`flex items-center gap-2 text-base transition-all duration-300 hover:text-red-500`}
          >
            <LogOut className="size-4" />
            Logout
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
