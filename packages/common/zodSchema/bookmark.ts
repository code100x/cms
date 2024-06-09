import { z } from 'zod';

export const BookmarkCreateSchema = z.object({
  contentId: z.number(),
});
export const BookmarkDeleteSchema = z.object({
  id: z.number(),
});
