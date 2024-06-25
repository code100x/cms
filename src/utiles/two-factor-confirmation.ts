import db from '@/db';

export const getTwoFactorConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorConfirmation = await db.twoFactorConfirmation.findFirst({
      where: { userId },
    });
    return twoFactorConfirmation;
  } catch (error) {
    console.log(error);
    return null;
  }
};
