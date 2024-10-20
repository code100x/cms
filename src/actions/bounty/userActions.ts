'use server';
import prisma from '@/db';
import { bountySubmissionSchema } from './schema';
import { BountySubmissionData } from './types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createSafeAction } from '@/lib/create-safe-action';
import { Prisma } from '@prisma/client';

async function submitBountyHandler(data: BountySubmissionData) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return { error: 'User not authenticated' };
    }

    const bountySubmission = await prisma.bountySubmission.create({
      data: {
        prLink: data.prLink,
        paymentMethod: data.paymentMethod,
        userId: session.user.id,
      },
    });
    return { data: bountySubmission };
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return {
          error: 'PR already submitted. Try a different one.',
        };
      }
    }
    return { error: 'Failed to submit bounty!' };
  }
}

export async function getUserBounties() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      throw new Error('User not authenticated');
    }

    const bounties = await prisma.bountySubmission.findMany({
      where: { userId: session.user.id },
      include: { user: true },
    });

    return bounties;
  } catch (error) {
    console.error('Error retrieving user bounties:', error);
    throw error;
  }
}

export const submitBounty = createSafeAction(
  bountySubmissionSchema,
  submitBountyHandler,
);
