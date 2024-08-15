import { z } from 'zod';
import { payoutMethodDeleteSchema, solanaAddressInsertSchema, upiIdInsertSchema } from './schema';
import { ActionState } from '@/lib/create-safe-action';
import { SolanaAddress, UpiId } from '@prisma/client';
import { Delete } from '@/lib/utils';

export type InputTypeCreateUpi = z.infer<typeof upiIdInsertSchema>;
export type ReturnTypeCreateUpi = ActionState<InputTypeCreateUpi, UpiId>;

export type InputTypeCreateSolana = z.infer<typeof solanaAddressInsertSchema>;
export type ReturnTypeCreateSolana = ActionState<InputTypeCreateSolana, SolanaAddress>;

export type DeleteTypePayoutMethod = z.infer<typeof payoutMethodDeleteSchema>;
export type ReturnTypePayoutMethodDelete = ActionState<DeleteTypePayoutMethod, Delete>;
