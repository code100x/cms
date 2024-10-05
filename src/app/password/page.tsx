import { PasswordChange } from '@/components/account/PasswordChange';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function PasswordChangePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/');
  }
  return (
    <section className="wrapper relative flex min-h-screen items-center justify-center overflow-hidden antialiased">
      <PasswordChange />
    </section>
  );
}
