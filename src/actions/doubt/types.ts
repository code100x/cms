import { Doubt } from '@prisma/client';
import { ActionState } from '@/lib/create-safe-action';
import { z } from 'zod';
import { CreateAnswerSchema, CreateDoubtSchema } from './schema';

export type InputTypeCreateDoubt = z.infer<typeof CreateDoubtSchema>;
export type ReturnTypeCreateDoubt = ActionState<InputTypeCreateDoubt, Doubt>;

export type InputTypeCreateAnswer = z.infer<typeof CreateAnswerSchema>;
export type ReturnTypeCreateAnswer = ActionState<InputTypeCreateDoubt, Doubt>;
