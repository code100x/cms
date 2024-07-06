import { RazorPayComponent } from '@/components/razorpay/Razorpay';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import db from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function CourseDetails({
  params,
}: {
  params: { courseId: string[] };
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/signin');
  }
  const course = await db.course.findFirst({
    where: {
      id: Number(params.courseId),
    },
  });
  if (!course) return <div>Course does not exist</div>;

  const ifPurchasedByUser =
    (await db.userPurchases.count({
      where: {
        userId: session.user.id,
        courseId: course.id,
      },
    })) > 0
      ? true
      : false;

  return (
    <Card className="w-500" key={course.id}>
      <CardContent className="flex justify-center">
        <Image src={'/harkirat.png'} alt="" width={200} height={100} />
      </CardContent>
      <CardHeader>
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Button variant="outline">INR {course.price}</Button>
        {ifPurchasedByUser ? (
          <button>View Receipt</button>
        ) : (
          <RazorPayComponent courseId={course.id} key={course.id} />
        )}
      </CardFooter>
    </Card>
  );
}
