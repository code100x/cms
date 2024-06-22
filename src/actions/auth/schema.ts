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

export const UpdateCredentialsSchema = z
  .object({
    email: z.string().email().optional(),
    name: z.string().optional(),
    currentPassword: z.optional(z.string().min(4)),
    newPassword: z.optional(z.string().min(4)),
    twoFactorEnabled: z.boolean().optional(),
  })
  .refine(
    (data) => {
      if (!data.currentPassword && data.newPassword) return false;
      if (data.currentPassword && !data.newPassword) return false;
      return true;
    },
    {
      message: 'Invalid Password',
    },
  );
