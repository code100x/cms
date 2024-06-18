import db from '@/db';
import { v4 as uuid } from 'uuid';
import crypto from 'crypto';

export const generatePasswordVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = await db.passwordResetToken.findFirst({
    where: { email },
  });
  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return passwordResetToken;
};

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(10000, 1000000).toString();
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  try {
    const existingToken = await db.twoFactorToken.findFirst({
      where: { email },
    });

    if (existingToken) {
      await db.twoFactorToken.delete({
        where: { id: existingToken.id },
      });
    }

    const twoFactorToken = await db.twoFactorToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
    return twoFactorToken;
  } catch (error) {
    console.log(error);
    return null;
  }
};
