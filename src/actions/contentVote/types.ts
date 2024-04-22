import { Content } from '@prisma/client';
import { ActionState } from '@/lib/create-safe-action';
import { z } from 'zod';
import { ContentVoteHandleSchema } from './schema';

export type InputTypeHandleContentVote = z.infer<
  typeof ContentVoteHandleSchema
>;
export type ReturnTypeHandleContentVote = ActionState<
  InputTypeHandleContentVote,
  Content | null
>;
