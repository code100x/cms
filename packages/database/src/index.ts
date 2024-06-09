import {
  PrismaClient,
  Prisma,
  CommentType,
  VoteType,
  Answer,
  Bookmark,
  Content,
  CourseContent,
  User,
  Comment,
  Vote,
  Question,
  Course,
  Certificate,
  VideoProgress
} from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// eslint-disable-next-line
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export {
  CommentType,
  Prisma,
  VoteType,
  PrismaClient
}

export type {
  Answer,
  Bookmark,
  Content,
  CourseContent,
  User,
  Comment,
  Vote,
  Question,
  Course,
  Certificate,
  VideoProgress
}
