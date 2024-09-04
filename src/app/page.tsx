import LandingPage from '@/components/landing/landing-page';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

const getUserDetails = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export default async function Home() {
  const session = await getUserDetails();

  if (session?.user) {
    redirect('/home');
  }

  return (
    <main>
      <LandingPage />
    </main>
  );
}
