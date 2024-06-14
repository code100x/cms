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
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function PurchasePage() {
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
        {courses.length === 0 ? (
          <div>No New Courses to Buy</div>
        ) : (
          courses.map((course) => (
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
                <Link href={`/new-courses/${course.id}`}>
                  <Button>View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))
        )}
      </main>
    </>
  );
}
