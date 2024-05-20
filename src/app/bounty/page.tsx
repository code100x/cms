import BountyAdmin from '@/components/BountyAdmin';
import BountyUser from '@/components/BountyUser';
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
    return <BountyUser userInfo={userInfo} role={role} />;
  }

  if (role === 'admin') {
    const allGithubBountyInfo = await getAllBountyDetail();
    if (!allGithubBountyInfo) {
      return <div>No bounties</div>;
    }
    const allDetails = {
      userInfo: allGithubBountyInfo.userInfo,
      bountyInfo: allGithubBountyInfo.bountyInfo,
    };

    return <BountyAdmin allGithubBountyInfo={allDetails} />;
  }
}
