'use client';

import React, { useState } from 'react';
import AdminSideBar from './AdminSideBar';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AdminSideBarWithToggle = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`${isCollapsed ? 'w-20' : 'w-80'} relative inset-y-0 hidden h-full flex-col bg-custom-light transition-all duration-300 ease-in-out dark:bg-custom-dark-opacity md:flex`}
    >
      <AdminSideBar isCollapsed={isCollapsed} />
      <button onClick={toggleSidebar} className="absolute bottom-10 right-0 mt-2 py-4 px-1 border rounded-l-sm">
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </div>
  );
};

export default AdminSideBarWithToggle;
