'use server';
import { createSafeAction } from '@/lib/create-safe-action';
import {
  BookmarkDeleteSchema,
  BookmarkSchema,
  BookmarkUpdateSchema,
} from './schema';
import { InputTypeCreateBookmark, InputTypeUpdateBookmark } from './types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { rateLimit } from '@/lib/utils';
import db from '@/db';
import { revalidatePath } from 'next/cache';

const createBookmarkHandler = async (
  data: InputTypeCreateBookmark,
): Promise<any> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'Unauthorized or insufficient permissions' };
  }

  const { timestamp, contentId, description, courseId } = data;
  const userId = session.user.id;

  if (!rateLimit(userId)) {
    return { error: 'Rate limit exceeded. Please try again later.' };
  }

  try {
    const createdBookmark = await db.videoBookmark.create({
      data: { contentId, description, userId, timestamp, courseId },
    });

    revalidatePath(`/courses/${courseId}/bookmarks`);

    return { data: createdBookmark };
  } catch (error: any) {
    return { error: error.message || 'Failed to create comment.' };
  }
};

const updateBookmarkHandler = async (
  data: InputTypeUpdateBookmark,
): Promise<any> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'Unauthorized or insufficient permissions' };
  }

  const { description, courseId, id } = data;
  const userId = session.user.id;

  if (!rateLimit(userId)) {
    return { error: 'Rate limit exceeded. Please try again later.' };
  }

  try {
    const updatedBookmark = await db.videoBookmark.update({
      where: { id },
      data: { description, userId },
    });

    revalidatePath(`/courses/${courseId}/bookmarks`);

    return { data: updatedBookmark };
  } catch (error: any) {
    return { error: error.message || 'Failed to create comment.' };
  }
};

const deleteBookmarkHandler = async (data: { id: number }): Promise<any> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: 'Unauthorized or insufficient permissions' };
  }

  const { id } = data;
  const userId = session.user.id;

  if (!rateLimit(userId)) {
    return { error: 'Rate limit exceeded. Please try again later.' };
  }
  try {
    const deletedBookmark = await db.videoBookmark.delete({
      where: {
        id,
      },
    });

    revalidatePath(`/courses/${deletedBookmark.courseId}/bookmarks`);

    return { data: deletedBookmark };
  } catch (error: any) {
    return { error: error.message || 'Failed to create comment.' };
  }
};

export const createBookmark = createSafeAction(
  BookmarkSchema,
  createBookmarkHandler,
);

export const updateBookmark = createSafeAction(
  BookmarkUpdateSchema,
  updateBookmarkHandler,
);

export const deleteBookmark = createSafeAction(
  BookmarkDeleteSchema,
  deleteBookmarkHandler,
);
