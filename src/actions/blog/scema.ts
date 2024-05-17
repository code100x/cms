import { z } from 'zod';

export const blogInsertSchema = z.object({
  title: z.string().min(1),
  subTitle: z.string().min(1),
  imageUrl: z.string().min(1),
  blocks: z.object({
    blocks: z.array(
      z.object({
        id: z.string().optional(),
        type: z.string().optional(),
        data: z.object({
          text: z.string().optional(),
          url: z.string().optional(),
          items: z.array(z.string()).optional(),
          code: z.string().optional(),
          language: z.string().optional(),
          withBorder: z.boolean().optional(),
          withBackground: z.boolean().optional(),
          stretched: z.boolean().optional(),
          caption: z.string().optional(),
        }),
      }),
    ),
  }),
  tags: z.array(z.string()),
});
