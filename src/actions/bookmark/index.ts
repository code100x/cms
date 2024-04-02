'use server';
import { createSafeAction } from '@/lib/create-safe-action';
import { BookmarkCreateSchema, BookmarkDeleteSchema } from './schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { rateLimit } from '@/lib/utils';
import db from '@/db';
import {
  InputTypeCreateBookmark,
  InputTypeDeleteBookmark,
  ReturnTypeCreateBookmark,
} from './types';
import { revalidatePath } from 'next/cache';

const reloadBookmarkPage = (courseId: number) => {
  revalidatePath(`/courses/${courseId}/bookmarks`);
};

const createBookmarkHandler = async (
  data: InputTypeCreateBookmark,
): Promise<ReturnTypeCreateBookmark> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'Unauthorized or insufficient permissions' };
  }

  const { contentId, courseId } = data;
  const userId = session.user.id;

  if (!rateLimit(userId)) {
    return { error: 'Rate limit exceeded. Please try again later.' };
  }

  try {
    const addedBookmark = await db.bookmark.create({
      data: { contentId, userId, courseId },
    });
    reloadBookmarkPage(courseId);
    return { data: addedBookmark };
  } catch (error: any) {
    return { error: error.message || 'Failed to create comment.' };
  }
};

const deleteBookmarkHandler = async (
  data: InputTypeDeleteBookmark,
): Promise<any> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'Unauthorized or insufficient permissions' };
  }

  const { id, courseId } = data;
  const userId = session.user.id;

  if (!rateLimit(userId)) {
    return { error: 'Rate limit exceeded. Please try again later.' };
  }

  try {
    const deletedBookmark = await db.bookmark.delete({
      where: { id },
    });
    reloadBookmarkPage(courseId);
    return { data: deletedBookmark };
  } catch (error: any) {
    return { error: error.message || 'Failed to create comment.' };
  }
};

export const createBookmark = createSafeAction(
  BookmarkCreateSchema,
  createBookmarkHandler,
);
export const deleteBookmark = createSafeAction(
  BookmarkDeleteSchema,
  deleteBookmarkHandler,
);
