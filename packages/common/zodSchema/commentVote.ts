import { z } from 'zod';
import { VoteType } from '@repo/db'; // Assuming VoteType is an enum in Prisma

export const VoteHandleSchema = z.object({
  commentId: z.number().optional(),
  questionId: z.number().optional(),
  answerId: z.number().optional(),
  voteType: z.nativeEnum(VoteType),
  currentPath: z.string(),
});
