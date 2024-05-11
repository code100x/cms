'use server';

import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import db from '@/db';

export const checkCoursePurchased = async (courseId: string) => {
  const session = await getServerSession(authOptions);
  const user = session.user;

  if (!user) {
    return false;
  }

  const purchase = await db.userPurchases.findFirst({
    where: {
      userId: user.id,
      courseId: parseInt(courseId, 10),
    },
  });

  return !purchase ? false : true;
};
