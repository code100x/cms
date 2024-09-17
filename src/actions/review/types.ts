import { ActionState } from '@/lib/create-safe-action';
import { z } from 'zod';
import {
  ReviewInsertSchema,
  ReviewUpdateSchema,
  ReviewDeleteSchema,
} from './schema';
import { Delete } from '../types';
import { RatingAndReview } from '@prisma/client';

export type InputTypeCreateReview = z.infer<typeof ReviewInsertSchema>;
export type ReturnTypeCreateReview = ActionState<
  InputTypeCreateReview,
  RatingAndReview
>;

export type InputTypeUpdateReview = z.infer<typeof ReviewUpdateSchema>;
export type ReturnTypeUpdateReview = ActionState<
  InputTypeUpdateReview,
  RatingAndReview
>;

export type InputTypeDeleteReview = z.infer<typeof ReviewDeleteSchema>;
export type ReturnTypeDeleteReview = ActionState<InputTypeDeleteReview, Delete>;
