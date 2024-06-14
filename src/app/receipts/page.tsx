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

export default async function Receipts() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    redirect('/signin');
  }

  const courses = await db.purchase.findMany({
    where: {
      purchasedById: session.user.id,
    },
    select: {
      receiptId: true,
      purchasedCourse: true,
    },
  });

  return (
    <>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center w-full pt-5 gap-5">
        {courses.length === 0 ? (
          <div>No Receipts found</div>
        ) : (
          courses.map((course) => (
            <Card className="w-500" key={course.purchasedCourse.id}>
              <CardContent className="flex justify-center">
                <Image src={'/harkirat.png'} alt="" width={200} height={100} />
              </CardContent>
              <CardHeader>
                <CardTitle>{course.purchasedCourse.title}</CardTitle>
                <CardDescription>
                  {course.purchasedCourse.description}
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex justify-between">
                Receipt Id: {course.receiptId}
              </CardFooter>
            </Card>
          ))
        )}
      </main>
    </>
  );
}
