'use client';
import React from 'react';
import { useRecoilState } from 'recoil';
import { usePathname } from 'next/navigation';
import { sidebarOpen as sidebarOpenAtom } from '../store/atoms/sidebar';
import { ToggleButton } from './Sidebar';

function ContentToggler() {
  const currentPath = usePathname();
  const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenAtom);
  return (
    <>
      {currentPath.includes('courses') && !sidebarOpen && (
        <div
          className="absolute right-0 z-50 flex cursor-pointer items-center justify-center rounded-md backdrop-blur-md md:right-5"
          onClick={() => {
            setSidebarOpen((p) => !p);
          }}
        >
          <ToggleButton sidebarOpen={sidebarOpen ? false : true} />
        </div>
      )}
    </>
  );
}

export default ContentToggler;
