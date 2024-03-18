import { z } from 'zod';

export const BookmarkSchema = z.object({
  contentId: z.number(),
  timestamp: z.number(),
  description: z
    .string()
    .min(3, 'Description must contain at least 3 characters'),
  courseId: z.number(),
});

export const BookmarkUpdateSchema = z.object({
  description: z
    .string()
    .min(3, 'Description must contain at least 3 characters'),
  courseId: z.number(),
  id: z.number(),
});

export const BookmarkDeleteSchema = z.object({
  id: z.number(),
});
