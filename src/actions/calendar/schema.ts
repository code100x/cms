import { z } from 'zod';

export const getEventsSchema = z.object({
  courseId: z.number(),
});
