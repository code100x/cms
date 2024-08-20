'use client';
import { useState } from 'react';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
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
} from '@/components/ui/alert-dialog';
import Logo from '../landing/logo/logo';
import {
  Library,
  Bookmark,
  MessageSquare,
  History,
  PanelRightOpen,
  LogOut,
  AlertTriangleIcon,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
export const menuOptions = [
  { id: 1, name: 'My Courses', Component: Library, href: '/my-courses' },
  { id: 3, name: 'Bookmarks', Component: Bookmark, href: '/bookmark' },
  { id: 4, name: 'Questions', Component: MessageSquare, href: '/question' },
  { id: 5, name: 'Watch Hostory', Component: History, href: '/watch-history' },
];

export const MenuOptions = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="flex h-full flex-col border-r bg-white shadow-sm dark:bg-[#020817]">
        {/* Header with logo and expand/collapse button */}
        <div className="flex items-center justify-between border-b p-4 pb-2">
          {expanded && (
            <div className="h-30 w-30">
              <Logo onFooter={false} />
            </div>
          )}
          <div
            className="cursor-pointer"
            onClick={() => setExpanded((curr) => !curr)}
          >
            <div className="p-2">
              <PanelRightOpen size={24} />
            </div>
          </div>
        </div>

        <div className="boarder border-gray flex flex-1 flex-col gap-6 p-4">
          <AnimatedTooltip expanded={expanded} items={menuOptions} />
        </div>

        <div className="border-t">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <div className="flex cursor-pointer items-center justify-center rounded-md px-4 py-2 text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white">
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
                  className="transform rounded-md bg-gradient-to-r from-red-500 to-red-600 px-4 py-2 font-medium shadow-md transition-all duration-200 ease-in-out hover:scale-105 hover:from-red-600 hover:to-red-700 dark:from-red-600 dark:to-red-700 dark:text-white dark:hover:from-red-700 dark:hover:to-red-800"
                  onClick={async () => await signOut()}
                >
                  Logout
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </nav>
    </aside>
  );
};

/* export const MenuOptions = () => {
  return <nav className="dark:bg-[#020817] border-r-2 border-gray-700/50 h-screen w-72 overflow-hide justify-between flex items-center flex-col  gap-10 py-6 px-2">
    <div className="flex flex-col items-center justify-center gap-8">
      <div className="flex flex-row items-center gap-8">
        <Logo onFooter={false} />
        <div onClick={() => { }}>
          <TbLayoutSidebarRightExpand size={22} color="white" />
        </div>
      </div>
      <AnimatedTooltip items={menuOptions} />
    </div>
  </nav>
} */
