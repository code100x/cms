import { z } from 'zod';

export const markAsCompletedRequestBodySchema = z.object({
  contentId: z.number(),
  markAsCompleted: z.boolean(),
});

export const videoProRequestBodySchema = z.object({
  contentId: z.number(),
  currentTimestamp: z.number(),
});
