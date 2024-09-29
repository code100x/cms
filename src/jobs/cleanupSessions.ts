import db from '../db';
export async function cleanupExpiredSessions() {
  const now = new Date();
  await db.userSession.deleteMany({
    where: {
      expiresAt: {
        lt: now,
      },
    },
  });
}
