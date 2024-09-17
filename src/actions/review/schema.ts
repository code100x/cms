import { z } from 'zod';

const ratingNumSchema = z
  .number()
  .min(1, 'Rating must be at least 1')
  .max(5, 'Rating cannot exceed 5');

export const ReviewInsertSchema = z.object({
  content: z.string().min(1, 'Review content is required'),
  ratingNum: ratingNumSchema,
  courseId: z.number(),
  currentPath: z.string().optional(),
});

export const ReviewUpdateSchema = z.object({
  reviewId: z.number(),
  content: z.string().optional(),
  ratingNum: ratingNumSchema,
  currentPath: z.string().optional(),
});

export const ReviewDeleteSchema = z.object({
  reviewId: z.number(),
  currentPath: z.string().optional(),
});
