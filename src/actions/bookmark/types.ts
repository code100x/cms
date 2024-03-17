import { z } from 'zod';
import { BookmarkSchema } from './schema';
import { ActionState } from '@/lib/create-safe-action';
import { Content, VideoBookmark } from '@prisma/client';

export type InputTypeCreateBookmark = z.infer<typeof BookmarkSchema>;
export type ReturnTypeCreateBookmark = ActionState<
  InputTypeCreateBookmark,
  VideoBookmark
>;

export type TBookmarkWithContent = VideoBookmark & {
  content: Content & { parent: Content | null };
};
