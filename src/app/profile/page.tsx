import Profile from '@/components/profile/Profile';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/signin');
  }
  return (
    <div>
      <Profile name={session.user.name} email={session.user.email} />
    </div>
  );
}
