'use server';
import { createSafeAction } from '@/lib/create-safe-action';
import {
  BookmarkCreateSchema,
  BookmarkDeleteSchema,
} from '@/actions/bookmark/schema';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import db from '@/db';
import type {
  InputTypeCreateBookmark,
  InputTypeDeleteBookmark,
  ReturnTypeCreateBookmark,
} from '@/actions/bookmark/types';
import { revalidatePath } from 'next/cache';

const reloadBookmarkPage = () => {
  revalidatePath('/bookmarks');
};

const createBookmarkHandler = async (
  data: InputTypeCreateBookmark,
): Promise<ReturnTypeCreateBookmark> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'Unauthorized or insufficient permissions' };
  }

  const { contentId } = data;
  const userId = session.user.id;

  try {
    const addedBookmark = await db.bookmark.upsert({
      where: {
        contentId,
        userId,
      },
      create: {
        contentId,
        userId,
      },
      update: {},
    });
    reloadBookmarkPage();
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
  const userId = session.user.id;
  const { id } = data;

  try {
    const deletedBookmark = await db.bookmark.delete({
      where: { id, userId },
    });
    reloadBookmarkPage();
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
