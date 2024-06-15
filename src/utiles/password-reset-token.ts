import db from '@/db';

export const getPasswordResetTokenByToken = async (token: string) => {
  if (!token) {
    return { error: 'Invalid Token' };
  }
  try {
    const getPasswordResetToken = await db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
    return getPasswordResetToken;
  } catch (error) {
    console.log(error);
  }
};

export const getPasswordResetTokenByEmail = async (email: string) => {
  try {
    const getPasswordResetToken = await db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return getPasswordResetToken;
  } catch (error) {
    console.log(error);
  }
};
