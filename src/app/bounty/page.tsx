import AdminPage from '@/components/bounty/AdminPage';
import UserPage from '@/components/bounty/UserPage';
import { getAllBountyDetail, getGithubDetail } from '@/db/course';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function BountyPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/signin');
  }

  const { role, id } = session.user;

  if (role === 'user') {
    const userInfo = await getGithubDetail({ userId: id });
    if (!userInfo || userInfo.isLinked === false) {
      redirect('/signInGithub');
    }
    return <UserPage userInfo={userInfo} role={role} />;
  }

  if (role === 'admin') {
    const userInfo = await getAllBountyDetail();
    if (!userInfo) {
      return <div>No bounties</div>;
    }

    return <AdminPage allInfo={userInfo} />;
  }
}
