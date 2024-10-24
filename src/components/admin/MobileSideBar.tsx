import React from 'react';
import {
    Sheet,
    SheetTrigger,
    SheetContent
} from "@/components/ui/sheet";
import { Menu } from 'lucide-react';
import AdminSideBar from './AdminSideBar';

const MobileSideBar = () => {
  return (
    <Sheet>
        <SheetTrigger className='md:hidden pr-4 hover:opacity-75 transition'>
            <Menu />
        </SheetTrigger>
        <SheetContent side="left" className='p-0'>
            <AdminSideBar />
        </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;