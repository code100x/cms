import { z } from 'zod';

export const bountySubmissionSchema = z.object({
  prLink: z.string().url({ message: 'Invalid GitHub PR link' }),
  paymentMethod: z.string(),
});

export const adminApprovalSchema = z.object({
  bountyId: z.string().uuid({ message: 'Invalid Bounty ID' }),
  status: z.enum(['approved', 'rejected']),
});
