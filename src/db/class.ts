import db from '@/db';
import { cache } from './Cache';

export async function getAllClasses() {
  const value = await cache.get('getAllClasses', []);

  if (value) {
    return value;
  }

  const classes = await db.class.findMany({
    include: {
      course: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  cache.set('getAllClasses', [], classes);
  return classes;
}
