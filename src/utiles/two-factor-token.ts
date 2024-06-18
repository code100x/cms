import db from '@/db';

export const getTwoFactorTokenByToken = async (token: string) => {
  if (!token) {
    return { error: 'Invalid token' };
  }
  try {
    const twoFactorToken = await db.twoFactorToken.findUnique({
      where: { token },
    });

    return twoFactorToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getTwoFactorTokenByEmail = async (email: string) => {
  try {
    const twoFactorToken = await db.twoFactorToken.findFirst({
      where: { email },
    });
    return twoFactorToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
