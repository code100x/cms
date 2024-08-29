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
}: {
  items: {
    id: number;
    name: string;
    Component: any;
    href: string;
  }[];
}) => {
  const pathname = usePathname();
  return (
    <>
      {items.map((item) => {
        const isActive = pathname === item.href;
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger key={item.id}>
                <Link
                  href={item.href}
                  className={`flex items-center rounded-lg p-3 text-center transition-all duration-300 ${isActive ? 'bg-blue-600/15 text-blue-500' : 'hover:bg-blue-600/5 hover:text-blue-500'} gap-2`}
                >
                  <item.Component className="size-6" />
                  {isActive && (
                    <h4 className="hidden w-full font-medium tracking-tight md:flex md:text-lg">
                      {item.name}
                    </h4>
                  )}
                </Link>
              </TooltipTrigger>
              {isActive === false && (
                <TooltipContent side={'top'} sideOffset={2}>
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
