import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import GithubLogin from '@/components/GithubLogin';
import { redirect } from 'next/navigation';
import { getGithubDetail } from '@/db/course';

export default async function SigninGithub() {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    redirect('/signin');
  }

  const userInfo = await getGithubDetail({ userId });

  if (userInfo && userInfo.isLinked) {
    redirect('/bounty');
  }

  return <GithubLogin session={session} userId={userId} />;
}
