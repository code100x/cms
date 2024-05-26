import PaymentInfo from '@/components/PaymentInfo';
import { getGithubDetail } from '@/db/course';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const page = async () => {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    redirect('/signin');
  }

  const userInfo = await getGithubDetail({ userId });
  if (!userInfo || userInfo.isLinked === false) {
    redirect('/signInGithub');
  }

  return (
    <div>
      <PaymentInfo />
    </div>
  );
};

export default page;
