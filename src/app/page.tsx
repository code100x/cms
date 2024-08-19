import LandingPage from '@/components/landing/landing-page';
import { redirect } from 'next/navigation';
import { auth } from '@/auth'

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect('/my-courses')
  }

  return (
    <main className="pb-20 pt-36">
      <LandingPage />
    </main>
  );
}
