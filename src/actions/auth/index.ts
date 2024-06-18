'use server';
import { NewPasswordType, ResetPasswordType, SignInType } from './types';
import { NewPasswordSchema, ResetPasswordSchema, SignInSchema } from './schema';
import db from '@/db';
import { generatePasswordVerificationToken } from '@/lib/token';
import sendPasswordResetTokenEmail from '@/lib/mail';
import bcrypt from 'bcrypt';
import { getUserByEmail } from '@/utiles/user';
import { signIn } from 'next-auth/react';

export const SignIn = async (values: SignInType) => {
  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid Inputs' };
  }

  const { email, password } = validatedFields.data;
  const exisitingUser = await getUserByEmail(email);
  if (!exisitingUser || !exisitingUser.email) {
    return { error: "Email doesn't exists" };
  }

  try {
    const res = await signIn('credentials', {
      redirect: false,
      username: email,
      password,
    });

    return res;
  } catch (error) {
    console.log(error);
  }
};

export const ResetPasswordHandler = async (data: ResetPasswordType) => {
  const validatedFields = ResetPasswordSchema.safeParse(data);

  if (!validatedFields.success) {
    return { success: validatedFields.success, error: validatedFields.error };
  }
  const { email } = validatedFields.data;

  try {
    const existingUser = await db.user.findFirst({
      where: { email },
    });

    if (!existingUser) {
      return { success: false, error: 'Email not exists' };
    }
    const passwordResetToken = await generatePasswordVerificationToken(email);
    const response = await sendPasswordResetTokenEmail(
      passwordResetToken.email,
      passwordResetToken.token,
    );
    if (!response?.error)
      return { success: true, message: 'Email Sent Successfully' };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      return { error: error.message };
    }
  }
};

export const createNewPassword = async (
  token: string,
  values: NewPasswordType,
) => {
  const validatedFields = NewPasswordSchema.safeParse(values);
  try {
    if (!validatedFields.success) {
      return { success: validatedFields.success, error: 'Invalid inputs' };
    }

    const { password } = validatedFields.data;

    const existingToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    if (!existingToken) {
      return { success: false, error: 'Token not found' };
    }

    const expiresTime = existingToken?.expires;

    const hasTokenExpired =
      new Date(expiresTime.getTime() + 3600 * 1000) < new Date();
    if (hasTokenExpired) {
      return { success: false, error: 'Token expired' };
    }
    const email = existingToken?.email;
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return { success: false, error: "Email doesn't exists " };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.update({
      where: { email },
      data: {
        password: hashedPassword,
      },
    });
    await db.passwordResetToken.delete({
      where: {
        id: existingToken?.id,
      },
    });
    return { success: true, message: 'Password Reset Successfully' };
  } catch (error) {
    console.log(error);
  }
};
