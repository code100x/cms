import { z } from 'zod';

export const passwordSchema = z.string().min(6, {
  message: 'Password must be at least 6 characters long',
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: passwordSchema,
}); 