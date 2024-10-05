import { ActionState } from '@/lib/create-safe-action';
import { z } from 'zod';
import { ChangePasswordSchema } from './schema';

export type InputTypeChangePassword = z.infer<typeof ChangePasswordSchema>;

interface ReturnChangePassword {
  message: string;
}

export type ReturnTypeChangePassword = ActionState<
  InputTypeChangePassword,
  ReturnChangePassword
>;