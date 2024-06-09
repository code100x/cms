import { PrismaClient } from '@repo/db';
import { beforeEach } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';

beforeEach(() => {
  mockReset(prisma);
});

const prisma = mockDeep<PrismaClient>();
export default prisma;
