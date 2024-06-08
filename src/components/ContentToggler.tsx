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
          className="z-50 absolute backdrop-blur-md  rounded-md flex justify-center items-center right-0 md:right-5 cursor-pointer "
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
