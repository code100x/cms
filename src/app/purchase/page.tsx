import { RazorPayComponent } from '@/components/razorpay/RazorPay';
import db from '@/db';

export default async function PurchasePage() {
  const courses = await db.course.findMany();

  return courses.map((course) => (
    <>
      <RazorPayComponent course_id={course.id} key={course.id} />
    </>
  ));
}
