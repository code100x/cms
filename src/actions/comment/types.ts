import { ActionState } from '@/lib/create-safe-action';
import { z } from 'zod';
import {
  CommentInsertSchema,
  CommentUpdateSchema,
  CommentDeleteSchema,
} from './schema';
import { Delete } from '../types';
import { User, Comment } from '@prisma/client';

export type InputTypeCreateComment = z.infer<typeof CommentInsertSchema>
export type ReturnTypeCreateComment = ActionState<
  InputTypeCreateComment,
  Comment
>

export type InputTypeUpdateComment = z.infer<typeof CommentUpdateSchema>
export type ReturnTypeUpdateComment = ActionState<
  InputTypeUpdateComment,
  Comment
>

export type InputTypeDeleteComment = z.infer<typeof CommentDeleteSchema>
export type ReturnTypeDeleteComment = ActionState<
  InputTypeDeleteComment,
  Delete
>

export interface ExtendedComment extends Comment {
  user: User
}
