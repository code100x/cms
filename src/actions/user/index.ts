'use server';
import db from '@/db';

export const logoutUser = async (email: string, adminPassword: string) => {
  if (adminPassword !== process.env.ADMIN_SECRET) {
    return { error: 'Unauthorized' };
  }

  const user = await db.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    return { message: 'User not found' };
  }
  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      token: '',
    },
  });

  return { message: 'User logged out' };
};
