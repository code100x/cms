import { z } from 'zod';

export const courseRequestBodySchema = z.object({
  adminSecret: z.string(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string().url().or(z.string()),
  id: z.string(),
  slug: z.string(),
  appxCourseId: z.string(),
  discordRoleId: z.string(),
});

export const discordRequestBodySchema = z.object({
  adminSecret: z.string(),
  email: z.string().email(),
});

export const drmRequestBodySchema = z.object({
  adminSecret: z.string(),
  email: z.string().email(),
  disableDrm: z.boolean(),
});

export const segmentsRequestBodySchema = z.object({
  adminSecret: z.string(),
  contentId: z.number(),
  segmentsJson: z.unknown(),
});
