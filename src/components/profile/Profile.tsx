import { Avatar } from '@/components/ui/avatar';
import { User2Icon } from 'lucide-react';
import { ChangePassword } from './ChangePassword';

export default async function Profile({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center m-2 p-2 py-9 rounded-lg space-y-2">
      <Avatar className="w-16 h-16 bg-red-400 mb-4 dark:border-2 dark:border-slate-400 flex items-center justify-center">
        <User2Icon color="white" className="w-full h-full p-5 bg-slate-600" />
      </Avatar>
      <div className="text-center mb-5">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-gray-500 dark:text-gray-400">{email}</p>
      </div>
      <div className="w-full max-w-lg">
        <ChangePassword />
      </div>
    </div>
  );
}
