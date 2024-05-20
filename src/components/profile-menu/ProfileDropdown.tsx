'use client';

import Link from 'next/link';
import {
  BookmarkIcon,
  DollarSignIcon,
  HistoryIcon,
  LogOutIcon,
  User2Icon,
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
import { SelectTheme } from './SelectTheme';

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
      href: '/bounty',
      icon: <DollarSignIcon className="mr-2 h-4 w-4" />,
      label: 'Bounty',
    },
  ];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="rounded-full cursor-pointer h-8 w-8 md:h-10 md:w-10 flex items-center justify-center bg-[#475A64]">
          <User2Icon color="white" className="w-4 h-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-3 mt-2 shadow-2xl">
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

        <DropdownMenuGroup>
          <SelectTheme />
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
          <LogOutIcon className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
