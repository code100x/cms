import { z } from 'zod';

export const assignmentSchema = z.object({
  title: z.string().refine((val) => val.trim() !== '', {
    message: 'Title is required',
  }),
  description: z.string().refine((val) => val.trim() !== '', {
    message: 'Description is required',
  }),
  course: z.string().refine((val) => val.trim() !== '', {
    message: 'Course is required',
  }),
  dueDate: z.string().refine((val) => val.trim() !== '', {
    message: 'Due date is required',
  }),
  dueTime: z.string().refine((val) => val.trim() !== '', {
    message: 'Due time is required',
  }),
  adminSecret: z.string().refine((val) => val.trim() !== '', {
    message: 'Admin secret is required',
  }),
});

export type AssignmentType = z.infer<typeof assignmentSchema>;
