import { z } from 'zod';
export const vizolvVideo = z.object({
  title: z
    .string()
    .min(1, { message: 'must not be empty' })
    .max(200, { message: 'length must not exceed 200 characters' }),
  description: z
    .string()
    .max(500, { message: 'length must not exceed 500 characters' })
    .optional(),
  duration: z.number().optional(),
  courseId: z
    .number()
    .min(1, { message: 'must be a positive integer' })
    .max(10, { message: 'invalid course id' }),
  folderId: z
    .number()
    .min(1, { message: 'must be a positive integer' })
    .max(10000, { message: 'invalid folder id' }),
  videoId: z
    .number()
    .min(1, { message: 'must be a positive integer' })
    .max(10000, { message: 'invalid video id' }),
  captions: z.string().url(),
});
