import { z } from 'zod';

export const payoutMethodSchema = z.object({
  upiId: z
    .string()
    .refine((value) => (/^[0-9A-Za-z._-]{2,256}@[A-Za-z]{2,64}$/).test(value), {
      message: 'Enter a valid UPI address',
    })
    .optional(),
  solanaAddress: z
    .string()
    .refine((value) => (/^[A-Za-z0-9]{44}$/).test(value), {
      message: 'Enter a valid Solana address',
    })
    .optional(),
});

export const upiIdInsertSchema = z.object({
  upiId: z
    .string()
    .refine((value) => (/^[0-9A_Za-z._-]{2,256}@[A_Za-z]{2,64}$/).test(value), {
      message: 'Invalid UPI address',
    }),
});

export const solanaAddressInsertSchema = z.object({
  solanaAddress: z.string().refine((value) => (/^[A-Za-z0-9]{44}$/).test(value), {
    message: 'Invalid Solana address',
  }),
});

export const payoutMethodDeleteSchema = z.object({
  id: z.number(),
});
