'use server';

import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import db from '@/db';

export const createCertificate = async (courseId: string) => {
  const session = await getServerSession(authOptions);
  const user = session.user;

  if (!user) {
    return { message: 'Please login to create a certificate' };
  }

  const newCert = await db.certificate.create({
    data: {
      userId: user.id,
      courseId: parseInt(courseId, 10),
    },
  });

  return { newCert };
};
