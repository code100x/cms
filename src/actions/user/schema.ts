import z from 'zod';

export const ChangePasswordSchema = z.object({
  currentpassword: z.string(),
  newpassword: z.string().min(6),
  confirmpassword: z.string().min(6),
});
