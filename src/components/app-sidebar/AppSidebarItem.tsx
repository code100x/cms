'use client';

import { useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LucideIcon } from 'lucide-react';
import { useSidebar } from '@/contexts/sidebarContext';

interface AppSidebarItemProps {
  icon: LucideIcon;
  id: string;
  text: string;
  alert: boolean;
}

const AppSidebarItem = ({
  icon: Icon,
  text,
  alert,
  id,
}: AppSidebarItemProps) => {
  const { expanded } = useSidebar();
  const pathname = usePathname();

  const isActive = useCallback(() => pathname === `/${id}`, [pathname, id]);

  return (
    <Link href={`/${id}`} passHref>
      <li
        className={`group relative my-1 flex cursor-pointer items-center rounded-md p-3 font-medium transition-colors ${
          isActive()
            ? 'bg-gradient-to-r from-primary to-secondary text-white'
            : 'text-gray-500 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10'
        }`}
      >
        <Icon
          className={`mr-2 h-6 w-6 ${isActive() ? 'text-white' : 'text-gray-500 group-hover:text-gray-700'}`}
        />
        <span
          className={`overflow-hidden capitalize transition-all ${expanded ? 'ml-3 w-52' : 'w-0'}`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 h-2 w-2 rounded bg-red-500 ${expanded ? '' : 'top-2'}`}
          />
        )}
        {!expanded && (
          <div
            className={`invisible absolute left-full z-30 ml-6 -translate-x-3 rounded-md border border-gray-200 bg-white px-2 py-1 text-sm capitalize text-gray-700 opacity-20 shadow-lg transition-all group-hover:visible group-hover:translate-x-0 group-hover:opacity-100`}
          >
            {text}
          </div>
        )}
      </li>
    </Link>
  );
};

export default AppSidebarItem;
