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

export const searchPayoutMethods = async (
  searchTerm: string,
  adminPassword: string,
) => {
  if (adminPassword !== process.env.ADMIN_SECRET) {
    return { error: 'Unauthorized' };
  }
  let user;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(searchTerm)) {
    user = await db.user.findUnique({
      where: { email: searchTerm },
      include: {
        upiIds: true,
        solanaAddresses: true,
      },
    });
  } else {
    user = await db.user.findFirst({
      where: { githubUser: { username: searchTerm } },
      select: {
        upiIds: true,
        solanaAddresses: true,
      },
    });
  }

  if (user) {
    return {
      data: { upiIds: user.upiIds, solAddresses: user.solanaAddresses },
    };
  } else {
    return { error: 'User not found' };
  }
};
