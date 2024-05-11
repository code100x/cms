import { z } from 'zod';

export const CreateDoubtSchema = z.object({
  title: z.string().min(1, 'Doubt title is required'),
  description: z.string().min(1, 'Doubt description is required'),
  contentId: z.number(),
  content: z.string(),
});

export const CreateAnswerSchema = z.object({
  doubtId: z.string(),
  content: z.string(),
});
