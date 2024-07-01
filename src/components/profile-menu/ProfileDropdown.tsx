'use client';

import Link from 'next/link';
import {
  BookmarkIcon,
  HistoryIcon,
  LogOutIcon,
  User2Icon,
  Bird,
  User,
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
      href: '/questions',
      icon: <Bird className="mr-2 h-4 w-4" />,
      label: 'Questions',
    },
  ];

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#475A64] md:h-10 md:w-10">
          <User2Icon color="white" className="h-4 w-4" />
          {/* <Image src={jiraya} className='' alt="" /> */}
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

        <DropdownMenuGroup>
          <SelectTheme />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <ExternalLinks />
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <div className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            <Link href={'/avatar'} key={'/avatar'}>
              Change Avatar
            </Link>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            signOut();
          }}
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
