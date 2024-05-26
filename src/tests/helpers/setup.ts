import { PrismaClient } from '@prisma/client';
import '@testing-library/jest-dom';
import { beforeAll, beforeEach, afterAll, afterEach } from 'vitest';
process.env.DATABASE_URL =
  'postgresql://postgres:postgres@localhost:5432/cms?schema=public';

const prisma = new PrismaClient();

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.$disconnect();
});

beforeEach(async () => {
  // Optional: Reset the database state before each test
});

afterEach(async () => {
  // Optional: Clean up after each test
});

export { prisma };
