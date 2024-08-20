import { AnimatedTooltip } from '@/components/ui/animated-tooltip';
import { LogOut, PanelLeftOpen, PanelRightOpen } from 'lucide-react';
import { signOut } from 'next-auth/react';
import React from 'react';
import Logo from '../landing/logo/logo';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '../ui/sheet';
import { menuOptions } from './index';

const MobileNav = () => {
  const expanded = true;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="cursor-pointer p-2">
          <PanelLeftOpen size={24} />
        </div>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="background-light900_dark200 !max-w-[260px] border-none p-0"
      >
        <nav className="flex h-full flex-col bg-white shadow-sm dark:bg-[#020817]">
          {/* Header with logo and expand/collapse button */}
          <SheetHeader>
            <div className="flex items-center justify-between border-b p-4">
              <div className="h-30 w-30">
                <Logo onFooter={false} />
              </div>
              <SheetClose asChild>
                <div className="cursor-pointer">
                  <div className="p-2">
                    <PanelRightOpen size={24} />
                  </div>
                </div>
              </SheetClose>
            </div>
          </SheetHeader>

          <div className="boarder border-gray flex flex-1 flex-col gap-6 p-4">
            <AnimatedTooltip expanded={expanded} items={menuOptions} />
          </div>

          <div className="border-t p-4">
            <div className="flex rounded-md bg-[#DC26261A] p-2 dark:bg-[#DC26261A]">
              <LogOut size={24} color="#DD503F" />
              <button
                onClick={() => {
                  signOut();
                }}
                className={`flex items-center justify-between overflow-hidden transition-all ${
                  expanded ? 'ml-3 w-52' : 'w-0'
                }`}
              >
                <h4 className="font-semibold text-[#DD503F]">Logout</h4>
              </button>
            </div>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
