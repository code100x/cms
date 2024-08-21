import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Logo } from '../landing/logo/logo';
import { PanelLeftOpen } from 'lucide-react';

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="mr-4 flex h-10 items-center justify-between">
          <PanelLeftOpen className="h-4 w-4" />
        </div>
      </SheetTrigger>
      <SheetContent side={'left'} className="flex h-full flex-col">
        <SheetHeader className="w-full">
          <SheetTitle className="h-10 border-b">
            <div>
              <Logo onFooter={false} />
            </div>
          </SheetTitle>
          <SheetDescription className="flex h-full">
            <div className="flex h-full w-full flex-col justify-between">
              <div>
                <ul>
                  <li>HOME</li>
                  <li>ABOUT</li>
                </ul>
              </div>
              <div>FOTTER</div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
