import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Logo } from '../landing/logo/logo';
import { PanelLeftOpen } from 'lucide-react';
import { SidebarMenu } from './SidebarMenu';
import { useState } from 'react';

export function SheetMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <div className="mr-4 flex h-10 items-center justify-between">
          <PanelLeftOpen className="h-4 w-4" />
        </div>
      </SheetTrigger>
      <SheetContent side={'left'} className="flex flex-col">
        <SheetHeader className="border-b">
          <div className="mb-2">
            <Logo onFooter={false} />
          </div>
        </SheetHeader>
        <div
          className="flex-1 overflow-y-auto"
          onClick={() => setIsOpen(false)}
        >
          <SidebarMenu />
        </div>
      </SheetContent>
    </Sheet>
  );
}
