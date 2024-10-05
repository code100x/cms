import { z } from 'zod';
import { BookmarkCreateSchema, BookmarkDeleteSchema } from './schema';
import { ActionState } from '@/lib/create-safe-action';
import { Bookmark, Content, CourseContent } from '@prisma/client';

export type InputTypeCreateBookmark = z.infer<typeof BookmarkCreateSchema>;
export type ReturnTypeCreateBookmark = ActionState<
  InputTypeCreateBookmark,
  Bookmark
>;
export type InputTypeDeleteBookmark = z.infer<typeof BookmarkDeleteSchema>;
export type ReturnTypeDeleteBookmark = ActionState<
  InputTypeDeleteBookmark,
  Bookmark
>;

export type TBookmarkWithContent = Bookmark & {
  content: Content & {
    parent: { id: number; courses: CourseContent[] } | null;
    courses: CourseContent[];
  };
};
