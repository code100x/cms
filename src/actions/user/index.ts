'use server';
import db from '@/db';
import { InputTypeChangePassword, ReturnTypeChangePassword } from './types';
import { getServerSession } from 'next-auth';
import { authOptions, validateUser } from '@/lib/auth';
import bcrypt from 'bcrypt';
import { createSafeAction } from '@/lib/create-safe-action';
import { ChangePasswordSchema } from './schema';

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

const changePasswordHandler = async (
  data: InputTypeChangePassword,
): Promise<ReturnTypeChangePassword> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user.id) {
    return {
      error: 'Unauthorized',
    };
  }

  const { currentpassword, confirmpassword, newpassword } = data;

  if (newpassword !== confirmpassword) {
    return {
      error: 'New and Confirm password does not match',
    };
  }
  const { email } = session.user;

  // Get user token(require to update password)
  const user = await validateUser(email, currentpassword);
  if (!user.data)
    return {
      error: 'User not found',
    };

  const { userid, token } = user.data;

  // End point to change password
  const url = `https://harkiratapi.classx.co.in/post/changesecurity`;

  const myHeaders = new Headers();
  myHeaders.append('auth-key', process.env.APPX_AUTH_KEY || '');
  myHeaders.append('client-service', process.env.APPX_CLIENT_SERVICE || '');
  myHeaders.append('authorization', token);

  const body = new FormData();
  body.append('currentpassword', currentpassword);
  body.append('newpassword', newpassword);
  body.append('confirmpassword', confirmpassword);
  body.append('userid', userid);

  try {
    // Changing password to Appx
    const response = await fetch(url, {
      method: 'POST',
      headers: myHeaders,
      body,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Store new password in DB
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    await db.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
        token,
      },
    });

    return {
      data: {
        message: 'Password updated',
      },
    };
  } catch (error) {
    console.error('Error updating password user:', error);
    return {
      error: 'Fail to update password',
    };
  }
};

export const changePassword = createSafeAction(
  ChangePasswordSchema,
  changePasswordHandler,
);
