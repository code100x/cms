'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import AdminSideBar from '@/components/admin/AdminSideBar';

const AdminSideBarWithToggle = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`${isCollapsed ? 'w-20' : 'w-80'} relative inset-y-0 hidden min-h-screen flex-col bg-custom-light transition-all duration-300 ease-in-out dark:bg-custom-dark-opacity md:flex`}
    >
      <AdminSideBar isCollapsed={isCollapsed} />
      <button onClick={toggleSidebar} className="absolute top-[32rem] right-0 mt-2 py-4 px-1 border rounded-l-sm bg-custom-light dark:bg-gray-800">
        {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
      </button>
    </div>
  );
};

export default AdminSideBarWithToggle;
