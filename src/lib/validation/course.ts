import { z } from 'zod';

export const courseSchema = z.object({
  title: z.string().min(5, {
    message: 'Title must be at least 5 characters long.',
  }),
  imageUrl: z.string().url({
    message: 'Invalid URL format for imageUrl.',
  }),
  description: z.string().min(8, {
    message: 'Description must be at least of 8 characters long.',
  }),
  slug: z.string(),
  id: z.string(),
  adminSecret: z.string(),
  appxCourseId: z.string(),
  discordRoleId: z.string(),
});

export type CourseType = z.infer<typeof courseSchema>;

export const courseEditSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().or(z.string()).optional(),
  discordRoleId: z.string().optional(),
  slug: z.string().optional(),
  adminSecret: z.string().min(1),
  appxCourseId: z.string().optional(),
});

export type CourseEditType = z.infer<typeof courseEditSchema>;
