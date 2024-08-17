'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface AppSidebarItemProps {
  icon: LucideIcon;
  href: string;
  title: string;
  collapsed: boolean;
}

export const SidebarItem = ({
  icon: Icon,
  title,
  href,
  collapsed = false,
}: AppSidebarItemProps) => {
  const pathname = usePathname();

  const isActive = pathname === `/${href}`;

  return (
    <li
      className={`group relative flex cursor-pointer items-center rounded-md p-2 font-medium text-gray-500 transition-colors dark:text-white ${
        isActive ? 'bg-secondary' : 'hover:bg-secondary/30'
      } ${collapsed ? 'justify-center sm:px-2 sm:py-1' : 'sm:px-2 sm:py-1 md:p-3'} `}
    >
      <Link href={`/${href}`}>
        <div className={`flex items-center justify-center`}>
          <Icon className="h-3 w-3 dark:text-neutral-100 sm:h-4 sm:w-4 md:h-6 md:w-6" />
          <span
            className={`duration-900 hidden capitalize transition-all md:block ${collapsed ? 'md:hidden' : 'ml-3 w-52'}`}
          >
            {title}
          </span>
        </div>
      </Link>

      <div
        className={`invisible absolute left-full z-30 ml-6 w-32 -translate-x-3 rounded-md border border-gray-200 bg-white px-2 py-1 text-sm capitalize text-gray-700 opacity-20 shadow-lg transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 ${collapsed ? 'md:group-hover:visible' : 'md:group-hover:invisible'}`}
      >
        {title}
      </div>
    </li>
  );
};
