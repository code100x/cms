'use client';
import { getServerSession } from 'next-auth';

export default async function ProfileIcon() {
  const session = await getServerSession();
  return (
    <div className="flex size-12 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-blue-400 to-blue-700">
      <span className="font-semibold capitalize">
        {session?.user?.name?.charAt(0)}
      </span>
    </div>
  );
}
