import { z } from 'zod';
import { Answer } from '@prisma/client';
import { ActionState } from '@/lib/create-safe-action';
import {
  AnswerDeleteSchema,
  AnswerInsertSchema,
  AnswerUpdateSchema,
} from './schema';
import { Delete } from '@/lib/utils';

// Import or define your Answer Zod schemas here
// For example:
// import { AnswerInsertSchema, AnswerUpdateSchema, AnswerDeleteSchema } from './schema';

export type InputTypeCreateAnswer = z.infer<typeof AnswerInsertSchema>;
export type ReturnTypeCreateAnswer = ActionState<InputTypeCreateAnswer, Answer>;

export type InputTypeUpdateAnswer = z.infer<typeof AnswerUpdateSchema>;
export type ReturnTypeUpdateAnswer = ActionState<InputTypeUpdateAnswer, Answer>;

export type DeleteTypeAnswer = z.infer<typeof AnswerDeleteSchema>;
export type ReturnTypeDeleteAnswer = ActionState<DeleteTypeAnswer, Delete>;
