import { z } from "zod";

export const contentEditSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    thumbnail: z.string().optional(),
    adminSecret: z.string()
});

export type ContentEditType = z.infer<typeof contentEditSchema>;