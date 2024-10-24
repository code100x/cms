import db from '@/db';
import { cache } from './Cache';

export async function getSubmissionById(submissionId: number) {
  if (!submissionId) {
    return null;
  }
  const value = await cache.get('getSubmissionById', [submissionId.toString()]);
  if (value) {
    return value;
  }
  const submission = await db.submission.findUnique({
    where: {
      id: submissionId,
    },
    include: {
      course: {
        select: {
          title: true,
          id: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      assignment: true
    },
  });
  cache.set('getSubmissionById', [submissionId.toString()], submission);
  return submission;
}

export async function getSubmissionsByAssignmentId (assignmentId: number) {
  if (!assignmentId) {
    return null;
  }

  const value = await cache.get('getSubmissionsByAssignmentId', [assignmentId.toString()]);

  if (value) {
    return value;
  }

  const submissions = await db.submission.findMany({
    where: {
        assignmentId
    },
    include: {
      user: true,
      course: true
    }
  });
  cache.set('getSubmissionsByAssignmentId', [assignmentId.toString()], submissions);
  return submissions;
}

export async function getSubmissionByAssignmentAndUser (assignmentId: number, userId: string) {
  if (!assignmentId || !userId) {
    return null;
  }
  
  const cacheKey = `${assignmentId}-${userId}`;

  const value = await cache.get('getSubmissionByAssignmentAndUser', [cacheKey]);
  if (value) {
    return value;
  }

  const submission = await db.submission.findFirst({
    where: {
      assignmentId,
      userId
    },
    include: {
      assignment: true
    }
  });
  cache.set('getSubmissionByAssignmentAndUser', [cacheKey], submission);

  return submission;
}

export async function getSubmissionByUser (userId: string) {
  if (!userId) {
    return null;
  }

  const value = await cache.get('getSubmissionByUser', [userId.toString()]);
  if (value) {
    return value;
  }

  const submissions = await db.submission.findMany({
    where: {
      userId
    },
    select: {
      assignment: true,
      course: {
        select: {
          id: true,
          title: true
        }
      }
    }
  });

  cache.set('getSubmissionByUser', [userId.toString()], submissions);

  return submissions;
}