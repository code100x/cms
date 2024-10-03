import { z } from 'zod';

const UPI_REGEX = new RegExp('^[0-9A-Za-z._-]{2,256}@[A-Za-z]{2,64}$');
const SOLANA_ADDRESS_REGEX = new RegExp('^[A-Za-z0-9]{44}$');

export const payoutMethodSchema = z.object({
  upiId: z
    .string()
    .refine((value) => UPI_REGEX.test(value), {
      message: 'Enter a valid UPI address',
    })
    .optional(),
  solanaAddress: z
    .string()
    .refine((value) => SOLANA_ADDRESS_REGEX.test(value), {
      message: 'Enter a valid Solana address',
    })
    .optional(),
});

export const upiIdInsertSchema = z.object({
  upiId: z.string().refine((value) => UPI_REGEX.test(value), {
    message: 'Invalid UPI address',
  }),
});

export const solanaAddressInsertSchema = z.object({
  solanaAddress: z
    .string()
    .refine((value) => SOLANA_ADDRESS_REGEX.test(value), {
      message: 'Invalid Solana address',
    }),
});

export const payoutMethodDeleteSchema = z.object({
  id: z.number(),
});
