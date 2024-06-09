'use server';
import { createSafeAction } from '@repo/common/lib/create-safe-action';
import { BookmarkCreateSchema, BookmarkDeleteSchema } from '@repo/common/zodSchema/bookmark';
import { getServerSession } from 'next-auth';
import { authOptions } from '@repo/common/lib/auth';
import db from '@repo/db';
import {
  InputTypeCreateBookmark,
  InputTypeDeleteBookmark,
  ReturnTypeCreateBookmark,
} from '@repo/common/zodTypes/bookmark';
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
    const addedBookmark = await db.bookmark.create({
      data: {
        contentId,
        userId,
      },
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
