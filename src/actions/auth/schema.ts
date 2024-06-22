import * as z from 'zod';

export const ResetPasswordSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
});

export const NewPasswordSchema = z.object({
  password: z.string().min(4, {
    message: 'Minimum 4 characters is required',
  }),
});

export const SignInSchema = z.object({
  email: z.string().email({
    message: 'Email is required',
  }),
  password: z.string().min(4, {
    message: 'Minimum 4 characters is required',
  }),
  twoFactorCode: z.string().optional(),
});
