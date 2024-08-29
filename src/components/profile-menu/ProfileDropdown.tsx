'use client';

import Link from 'next/link';
import {
  BookmarkIcon,
  HistoryIcon,
  LogOutIcon,
  User2Icon,
  Bird,
  CreditCard,
  Calendar,
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
    {
      href: '/calendar',
      icon: <Calendar className="mr-2 h-4 w-4" />,
      label: 'Calendar',
    },
  ];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div
          className={`flex items-center gap-2 rounded-xl p-2 transition-all duration-300 hover:bg-blue-600/5 hover:text-blue-500`}
        >
          <User2Icon className="size-6" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mr-3 mt-2 w-56"
        side="top"
        sideOffset={16}
      >
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
