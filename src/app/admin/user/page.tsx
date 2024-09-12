import React from 'react';
import LogoutUserComp from './LogoutUser';
import { UserIcon } from 'lucide-react';

const UserAdminPage = () => {
  return (
    <div className="flex flex-col gap-4 mx-auto px-4 max-w-7xl h-[100dvh]">
      <section className='flex gap-2 border-2 p-4 bg-primary/5 rounded-lg my-4 items-center'>
        <UserIcon size={18} />
        <h2 className='text-md font-bold'>User Mangement</h2>
      </section>
      <LogoutUserComp />
    </div>
  );
};

export default UserAdminPage;
