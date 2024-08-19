'use client';

import Link from 'next/link';
import {
  BookmarkIcon,
  HistoryIcon,
  User2Icon,
  Bird,
  CreditCard,
  LogOut,
  AlertTriangleIcon,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

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
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#475A64] md:h-10 md:w-10">
          <User2Icon color="white" className="h-4 w-4" />
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

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="flex cursor-pointer items-center rounded-md px-4 py-2 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white">
              Logout <LogOut className="ml-2 h-5 w-5" />
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent className="mx-auto max-w-lg transform rounded-lg border border-gray-200 bg-white p-8 text-gray-900 shadow-2xl transition-all duration-300 ease-in-out dark:border-gray-700 dark:bg-background dark:text-gray-100">
            <AlertDialogHeader className="mb-6">
              <div className="flex items-center space-x-6">
                <div className="text-red-400">
                  <AlertTriangleIcon size={40} />
                </div>
                <div>
                  <AlertDialogTitle className="text-xl font-semibold tracking-tight">
                    Confirm Logout
                  </AlertDialogTitle>
                  <AlertDialogDescription className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Are you sure you want to log out? You will need to sign in
                    again to access your account.
                  </AlertDialogDescription>
                </div>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-end gap-4">
              <AlertDialogCancel className="transform rounded-md bg-gray-100 px-4 py-2 font-medium text-gray-800 shadow-md transition-all duration-200 ease-in-out hover:scale-105 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="transform rounded-md bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 font-medium text-white shadow-md transition-all duration-200 ease-in-out hover:scale-105 hover:from-red-600 hover:to-red-700 dark:from-red-600 dark:to-red-700 dark:text-white dark:hover:from-red-700 dark:hover:to-red-800"
                onClick={() => signOut()}
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
