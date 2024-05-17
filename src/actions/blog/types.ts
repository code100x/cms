import { z } from 'zod';
import { ActionState } from '@/lib/create-safe-action';
import { blogInsertSchema } from './scema';
import { Post } from '@prisma/client';

export type InputTypeCreateBlog = z.infer<typeof blogInsertSchema>;
export type ReturnTypeCreateBlog = ActionState<InputTypeCreateBlog, Post>;
