import { VoteType } from '@prisma/client';
import { z } from 'zod';

export const ContentVoteHandleSchema = z.object({
  contentId: z.number(),
  voteType: z.nativeEnum(VoteType),
  currentPath: z.string(),
});
