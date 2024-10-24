import db from '@/db';
import { cache } from './Cache';

export async function getAllAssignments() {
  const value = await cache.get('getAllAssignments', []);
  if (value) {
    return value;
  }
  const assignments = await db.assignment.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      course: {
        select: {
          id: true,
          title: true,
        },
      },
      dueDate: true,
      dueTime: true,
      createdAt: true,
      updatedAt: true
    },
  });

  cache.set('getAllAssignments', [], assignments);
  return assignments;
}

export async function getAssignmentById (assignmentId: number) {
  if (!assignmentId) {
    return  null;
  }
  const value = await cache.get('getAssignmentById', [assignmentId.toString()]);

  if (value) {
    return value;
  }

  const res = await db.assignment.findUnique({
    where: {
      id: assignmentId,
    },
  });

  cache.set('getAssignmentById', [assignmentId.toString()], res);

  return res;
}