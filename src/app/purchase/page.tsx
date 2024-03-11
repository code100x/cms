import { RazorPayComponent } from '@/components/razorpay/RazorPay';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import db from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
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

  return (
    <>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center w-full pt-5 gap-5">
        {/* TODO: Improve this UI */}
        {courses.map((course) => (
          <Card className="w-max" key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Image src={'/harkirat.png'} alt="" width={200} height={100} />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">INR {course.price}</Button>
              <RazorPayComponent
                user_id={session.user.id}
                course_id={course.id}
                key={course.id}
              />
            </CardFooter>
          </Card>
        ))}
      </main>
    </>
  );
}
