import db from '@/db';

export const getUserById = async (userId: string) => {
  try {
    const existingUser = await db.user.findUnique({
      where: { id: userId },
    });
    return existingUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const existingUser = await db.user.findFirst({
      where: { email },
    });
    return existingUser;
  } catch (error) {
    console.log(error);
    return null;
  }
};
