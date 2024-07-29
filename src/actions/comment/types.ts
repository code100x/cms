import { ActionState } from '@/lib/create-safe-action';
import { z } from 'zod';
import {
  CommentInsertSchema,
  CommentUpdateSchema,
  CommentDeleteSchema,
  CommentApproveIntroSchema,
  CommentPinSchema,
  commentUpdateSchema,
} from './schema';
import { Delete } from '../types';
import { User, Comment, Vote } from '@prisma/client';

export type InputTypeCreateComment = z.infer<typeof CommentInsertSchema>;
export type ReturnTypeCreateComment = ActionState<
  InputTypeCreateComment,
  Comment
>;

export type InputTypeUpdateComment = z.infer<typeof CommentUpdateSchema>;
export type ReturnTypeUpdateComment = ActionState<
  InputTypeUpdateComment,
  Comment
>;
export type InputTypeApproveIntroComment = z.infer<
  typeof CommentApproveIntroSchema
>;
export type ReturnTypeApproveIntroComment = ActionState<
  InputTypeApproveIntroComment,
  Comment
>;

export type InputTypeDeleteComment = z.infer<typeof CommentDeleteSchema>;
export type ReturnTypeDeleteComment = ActionState<
  InputTypeDeleteComment,
  Delete
>;
export type InputTypePinComment = z.infer<typeof CommentPinSchema>;
export type ReturnTypePinComment = ActionState<InputTypePinComment, Comment>;

export interface ExtendedComment extends Comment {
  user?: User;
  votes?: Vote[];
}

export type UpdateCommentType = z.infer<typeof commentUpdateSchema>;
