import { z } from 'zod';

export const addClassSchema = z.object({
  title: z.string().refine((val) => val.trim() !== '', {
    message: 'Class title is required',
  }),
  description: z.string().optional(),
  course: z.string().refine((val) => val.trim() !== '', {
    message: 'Course is required',
  }),
  date: z.string().refine((val) => val.trim() !== '', {
    message: 'Scheduled date is required',
  }),
  startTime: z.string().refine((val) => val.trim() !== '', {
    message: 'Start time is required',
  }),
  endTime: z.string().refine((val) => val.trim() !== '', {
    message: 'End time is required',
  }),
  meetingLink: z.string().refine((val) => val.trim() !== '', {
    message: 'Meeting link is required',
  }),
  adminSecret: z.string().refine((val) => val.trim() !== '', {
    message: 'Admin secret is required',
  }),
});

export type AddClasstype = z.infer<typeof addClassSchema>;
