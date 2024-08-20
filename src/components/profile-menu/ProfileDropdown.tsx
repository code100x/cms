'use client';

import Link from 'next/link';
import {
  BookmarkIcon,
  HistoryIcon,
  LogOutIcon,
  Bird,
  CreditCard,
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
import { useEffect, useState } from 'react';

const ProfileDropdown = ({ session }: any) => {
  const [initials, setInitials] = useState('');
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
  useEffect(() => {
    console.log(session);
    if (session && session?.user && session?.user?.name) {
      const name = session?.user?.name;
      const nameArray = name.split(' ');
      let initials = '';
      if (nameArray.length === 1 && nameArray[0].length > 0) {
        initials = nameArray[0][0];
      }
      if (
        nameArray.length > 1 &&
        nameArray[0].length > 0 &&
        nameArray[nameArray.length - 1].length > 0
      ) {
        initials = nameArray[0][0] + nameArray[nameArray.length - 1][0];
      }
      setInitials(initials.toUpperCase());
    }
  }, [session]);
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#475A64] md:h-10 md:w-10">
          {initials.length > 0 ? (
            <div className="flex h-4 w-4 items-center justify-center font-bold text-white">
              {initials}
            </div>
          ) : (
            <User2Icon color="white" className="h-4 w-4" />
          )}
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
