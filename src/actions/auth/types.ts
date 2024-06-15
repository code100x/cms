import * as z from 'zod';
import { NewPasswordSchema, ResetPasswordSchema, SignInSchema } from './schema';

export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;
export type NewPasswordType = z.infer<typeof NewPasswordSchema>;
export type SignInType = z.infer<typeof SignInSchema>;
