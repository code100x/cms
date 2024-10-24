import React from 'react';
import AdminSideBarRoutes from './AdminSideBarRoutes';

const AdminSideBar = () => {
  return (
    <div className='h-full border-r flex flex-col overlfow-y-auto shadow-sm pt-4'>
        <div className='flex flex-col w-full'>
            <AdminSideBarRoutes />
        </div>
    </div>
  );
};

export default AdminSideBar;