import { PrismaClient } from '@repo/db';

const prisma = new PrismaClient();

export default async function resetDb() {
  await prisma.$transaction([
    prisma.videoMetadata.deleteMany(),
    prisma.notionMetadata.deleteMany(),
    prisma.bookmark.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.videoProgress.deleteMany(),
    prisma.courseContent.deleteMany(),
    prisma.content.deleteMany(),
    prisma.certificate.deleteMany(),
    prisma.userPurchases.deleteMany(),
    prisma.course.deleteMany(),
    prisma.session.deleteMany(),
    prisma.discordConnect.deleteMany(),
    prisma.discordConnectBulk.deleteMany(),
    prisma.vote.deleteMany(),
    prisma.answer.deleteMany(),
    prisma.question.deleteMany(),
    prisma.user.deleteMany(),
  ]);
}
