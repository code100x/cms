import { z } from 'zod';

export const QuestionInsertSchema = z.object({
  title: z.string().min(5, 'Question title too short'),
  content: z.string().min(0, 'Question content too short'),
  tags: z.array(z.string()).optional(),
});

export const QuestionUpdateSchema = z.object({
  title: z.string().min(5, 'Question title too short'),
  content: z.string().min(0, 'Question content too short'),
  tags: z.array(z.string()).optional(),
  questionId: z.number(),
  resolved: z.boolean(),
});
export const QuestionDeleteSchema = z.object({
  questionId: z.number(),
});
