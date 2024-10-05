import z from 'zod';

export const ChangePasswordSchema = z.object({
  currentpassword: z.string({ message: 'Required' }),
  newpassword: z
    .string({ message: 'Required' })
    .min(6, { message: 'Min length 6 required' }),
  confirmpassword: z
    .string({ message: 'Required' })
    .min(6, { message: 'Min length 6 required' }),
});
