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
  VideoProgress,
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

<<<<<<< HEAD
export { CommentType, Prisma, VoteType, PrismaClient };
=======
export {
  CommentType,
  Prisma,
  VoteType,
  PrismaClient
}
>>>>>>> 1d267da (feat: apps/next-frontend packages/common packages/database packages/eslint packages/tsconfig packages/ui)

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
<<<<<<< HEAD
  VideoProgress,
};
=======
  VideoProgress
}
>>>>>>> 1d267da (feat: apps/next-frontend packages/common packages/database packages/eslint packages/tsconfig packages/ui)
