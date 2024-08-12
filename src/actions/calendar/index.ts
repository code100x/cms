'use server';

import db from '@/db';
import { ContentType, InputTypeGetEvents, ReturnTypeGetEvents } from './types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getEventsSchema } from './schema';
import { createSafeAction } from '@/lib/create-safe-action';

export const getEventsHandler = async (
  data: InputTypeGetEvents,
): Promise<ReturnTypeGetEvents> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return { error: 'Unauthorized or insufficient permissions' };
    }

    const folders = await db.courseContent.findMany({
      where: {
        courseId: data.courseId,
      },
      include: {
        content: {
          select: {
            children: true,
          },
        },
      },
    });

    const content: ContentType[] = [];

    folders.forEach((folder) => {
      folder.content.children.forEach((el) => {
        if (el.type === 'video') {
          content.push({
            id: el.id,
            title: el.title,
            start: el.createdAt,
            end: el.createdAt,
          });
        }
      });
    });

    return { data: content };
  } catch (err: any) {
    return { error: err.message || 'Failed to fetch events' };
  }
};

export const getEvents = createSafeAction(getEventsSchema, getEventsHandler);
