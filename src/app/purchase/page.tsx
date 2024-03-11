import { RazorPayComponent } from '@/components/razorpay/RazorPay';
import db from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function PurchasePage() {
  // TODO: Use session for the current user
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/signin');
  }

  const courses = await db.course.findMany({
    where: {
      purchasedBy: {
        none: {
          userId: session.user.id,
        },
      },
    },
  });

  return courses.map((course) => (
    <>
      <RazorPayComponent
        user_id={session.user.id}
        course_id={course.id}
        key={course.id}
      />
    </>
  ));
}
