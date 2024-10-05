import React from 'react';
import LogoutUserComp from './LogoutUser';
import { UserIcon } from 'lucide-react';

const UserAdminPage = () => {
  return (
    <div className="mx-auto flex h-[100dvh] max-w-7xl flex-col gap-4 px-4">
      <section className="my-4 flex items-center gap-2 rounded-lg border-2 bg-primary/5 p-4">
        <UserIcon size={18} />
        <h2 className="text-md font-bold">User Mangement</h2>
      </section>
      <LogoutUserComp />
    </div>
  );
};

export default UserAdminPage;
