import db from '@/db';

export async function getActiveUsersBasedOnWatchHistory() {
  const recentDate = new Date();
  recentDate.setDate(recentDate.getDate() - 30); // active users in the last 30 days

  const activeUsers = await db.videoProgress.groupBy({
    by: ['userId'],
    where: {
      updatedAt: {
        gte: recentDate,
      },
    },
    _count: {
      userId: true,
    },
    orderBy: {
      _count: {
        userId: 'desc',
      },
    },
  });
  return activeUsers.length;
}

export async function getEnrolledStudents() {
  const purchaseCount = await db.user.count({
    where: {
      purchases: { some: {} },
    },
  });

  return purchaseCount;
}

export async function getGraduatedStudents() {
  const graduatedCount = await db.user.count({
    where: {
      certificate: { some: {} },
    },
  });
  return graduatedCount;
}
