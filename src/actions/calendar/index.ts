'use server';

import db from '@/db';
import { ContentType } from './types';
import { cache } from '@/db/Cache';
import { getEventsSchema } from './schema';

export const getEvents = async (courseId: number): Promise<ContentType[]> => {
  try {
    const { success } = getEventsSchema.safeParse({ courseId });

    if (!success) {
      console.log('Parsing failed');
      return [];
    }
    const value = await cache.get('getEvents', [courseId.toString()]);
    if (value) {
      return value;
    }
    const folders = await db.courseContent.findMany({
      where: {
        courseId,
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
    cache.set('getEvents', [courseId.toString()], content);
    return content;
  } catch (err) {
    console.error(err);
    return [];
  }
};
