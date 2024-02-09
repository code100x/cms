import { Comment } from '@prisma/client';
import { ActionState } from '@/lib/create-safe-action';
import { z } from 'zod';
import { VoteHandleSchema } from './schema';

export type InputTypeHandleVote = z.infer<typeof VoteHandleSchema>;
export type ReturnTypeHandleVote = ActionState<
  InputTypeHandleVote,
  Comment | null
>;
