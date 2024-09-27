'use client';
import React from 'react';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip';
import { usePathname } from 'next/navigation';

export const SidebarItems = ({
  items,
  isCollapsed,
}: {
  items: {
    id: number;
    name: string;
    Component: any;
    href: string;
  }[];
  isCollapsed: boolean;
}) => {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <TooltipProvider key={item.id}>
            <Tooltip>
              <TooltipTrigger>
                <Link
                  href={item.href}
                  className={`flex items-center rounded-lg p-3 text-center transition-all duration-300 ${
                    isActive
                      ? 'bg-blue-600/15 text-blue-500'
                      : 'hover:bg-blue-600/5 hover:text-blue-500'
                  } ${isCollapsed ? 'justify-center' : 'gap-2'}`}
                >
                  <item.Component size={18} />
                  {!isCollapsed && (
                    <span className="text-sm font-medium tracking-tight lg:text-lg">
                      {item.name}
                    </span>
                  )}
                </Link>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right" sideOffset={4}>
                  <p>{item.name}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </>
  );
};
