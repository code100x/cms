'use client';
import React from 'react';
// import { ToggleButton } from './Sidebar';
import { usePathname } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { sidebarOpen as sidebarOpenAtom } from '../store/atoms/sidebar';
import { ListVideo } from 'lucide-react';
import { Button } from './ui/button';

export default function SidebarToggle() {
    const currentPath = usePathname();
    const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom);
    return (
        <div>
            {currentPath.includes('courses') && (
                <Button
                    onClick={() => {
                        setSidebarOpen((p) => !p);
                    }}
                    variant={'outline'}
                    className='flex items-center gap-2'
                >
                    <ListVideo size={18} />
                    {/* <ToggleButton
                        sidebarOpen={sidebarOpen ? false : true}
                    /> */}
                    {
                        sidebarOpen ?

                            <p className='hidden md:block text-sm'>Hide List</p>
                            :
                            <p className='hidden md:block text-sm'>Show List</p>
                    }
                </Button>
            )}
        </div>
    )
}
