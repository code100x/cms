import React from 'react';
import { UserIcon } from 'lucide-react';
import UserManagement from './Usermanagement';

const UserAdminPage = () => {
  return (
    <div className="mx-auto flex h-[100dvh] max-w-7xl flex-col gap-4 px-4 pb-5">
      <section className="my-4 flex items-center gap-2 rounded-lg border-2 bg-primary/5 p-4">
        <UserIcon size={18} />
        <h2 className="text-md font-bold">User Mangement</h2>
      </section>
      <div className='flex h-full w-full flex-col'>
        <UserManagement />
      </div>
    </div>
  );
};

export default UserAdminPage;
