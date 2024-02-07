import { z } from 'zod';

export const CommentInsertSchema = z.object({
  content: z.string().min(1, 'Comment content is required'),
  contentId: z.number(),
  parentId: z.number().optional(),
  currentPath: z.string(),
});

export const CommentUpdateSchema = z.object({
  commentId: z.number(),
  content: z.string().optional(),
  //   upVotes: z.number().optional(),
  //   downVotes: z.number().optional(),
  approved: z.boolean().optional(),
  adminPassword: z.string().optional(),
  currentPath: z.string(),
});

export const CommentDeleteSchema = z.object({
  adminPassword: z.string().optional(),
  commentId: z.number(),
  currentPath: z.string(),
});
