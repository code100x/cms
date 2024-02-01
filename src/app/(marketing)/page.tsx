import { MyCourses } from '@/components/MyCourses';
import LandingPage from '@/components/landing/landing-page';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

const getUserDetails = async () => {
  const session = await getServerSession(authOptions);
  return session;
};

export default async function Home() {
  const session = await getUserDetails();

  if (session?.user) {
    return (
      <main className="max-w-screen-xl flex-col p-6 flex text-lg mx-auto">
        <div className="text-2xl">Your courses</div>

        <MyCourses />

        <br />
      </main>
    );
  }

  return <LandingPage />;
}
