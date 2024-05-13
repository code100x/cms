import { Answer, Comment, Question } from '@prisma/client';
import { ActionState } from '@/lib/create-safe-action';
import { z } from 'zod';
import { VoteHandleSchema } from '@/actions/commentVote/schema';

export type InputTypeHandleVote = z.infer<typeof VoteHandleSchema>;
export type ReturnTypeHandleVote = ActionState<
  InputTypeHandleVote,
  Question | Answer | Comment | null
>;

export enum VoteTypeModel {
  COMMENT,
  QUESTION,
  ANSWER,
}
