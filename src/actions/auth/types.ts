import * as z from 'zod';
import {
  NewPasswordSchema,
  ResetPasswordSchema,
  SignInSchema,
  UpdateCredentialsSchema,
} from './schema';

export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>;
export type NewPasswordType = z.infer<typeof NewPasswordSchema>;
export type SignInType = z.infer<typeof SignInSchema>;
export type UpdateCredentialsType = z.infer<typeof UpdateCredentialsSchema>;
