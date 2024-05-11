'use server';
import { getServerSession } from 'next-auth';
import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import { createSafeAction } from '@/lib/create-safe-action';
import { CreateAnswerSchema, CreateDoubtSchema } from './schema';
import { InputTypeCreateAnswer, InputTypeCreateDoubt } from './types';

const createDoubtHandler = async (data: InputTypeCreateDoubt) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return { error: 'Unauthorized or insufficient permissions' };
    }
    const { title, content, contentId, description } = data;
    const doubt = await prisma.doubt.create({
      data: {
        title,
        description,
        htmlContent: content,
        userId: session.user.id,
        contentId,
      },
    });
    return { data: doubt };
  } catch (e: any) {
    return { error: e.message || 'Failed to create doubt.' };
  }
};

export const getDoubts = async (contentId: number) => {
  try {
    const doubts = await prisma.doubt.findMany({
      where: {
        contentId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return { data: doubts };
  } catch (e: any) {
    return { error: e.message || 'Failed to fetch doubts.' };
  }
};

export const getDoubt = async (doubtId: string) => {
  try {
    const doubt = await prisma.doubt.findUnique({
      where: {
        id: doubtId,
      },
      include: {
        Answer: {
          select: {
            id: true,
            htmlContent: true,
            createdAt: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
    return { data: doubt };
  } catch (e: any) {
    return { error: e.message || 'Failed to fetch doubt.' };
  }
};

const createAnswerHandler = async (data: InputTypeCreateAnswer) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return { error: 'Unauthorized or insufficient permissions' };
  }
  const { content, doubtId } = data;
  try {
    const answer = await prisma.answer.create({
      data: {
        htmlContent: content,
        doubtId,
        userId: session.user.id,
      },
    });
    return { data: answer };
  } catch (e: any) {
    return { error: e.message || 'Failed to create answer.' };
  }
};

export const createDoubt = createSafeAction(
  CreateDoubtSchema,
  createDoubtHandler,
);

export const createAnswer = createSafeAction(
  CreateAnswerSchema,
  createAnswerHandler,
);
