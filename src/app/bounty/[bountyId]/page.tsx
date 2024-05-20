import BountyUser from '@/components/BountyUser';
import { getGithubDetail } from '@/db/course';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: { bountyId: string };
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/signin');
  }
  const { role } = session.user;

  if (role === 'user') {
    redirect('/bounty');
  }

  const userInfo = await getGithubDetail({ userId: params.bountyId });

  if (!userInfo || userInfo.isLinked === false) {
    redirect('/signInGithub');
  }

  return (
    <div>
      {role === 'admin' && <BountyUser userInfo={userInfo} role={role} />}
    </div>
  );
}
