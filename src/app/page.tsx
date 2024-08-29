import LandingPage from '@/components/landing/landing-page';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

/* const rs = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
}); */

const getUserDetails = async () => {
  // console.log('get user details start');
  // const date = new Date();
  const session = await getServerSession(authOptions);
  // console.log(
  //   `get user details end ${  (new Date().getTime() - date.getTime()) / 1000}`,
  // );
  return session;
};

export default async function Home() {
  const session = await getUserDetails();

  if (session?.user) {
    redirect('/home');
  }

  return (
    <main className="pb-20 pt-36">
      <LandingPage />
    </main>
  );
}
