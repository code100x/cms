'use server';
import prisma from '@/db';
import { bountySubmissionSchema } from './schema';
import { BountySubmissionData } from './types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function submitBounty(data: BountySubmissionData) {
  try {
    const validatedData = bountySubmissionSchema.parse(data);
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
      throw new Error('User not authenticated');
    }

    const bountySubmission = await prisma.bountySubmission.create({
      data: {
        prLink: validatedData.prLink,
        paymentMethod: validatedData.paymentMethod,
        userId: session.user.id,
      },
    });

    return bountySubmission;
  } catch (error) {
    console.error('Error submitting bounty:', error);
    throw error;
  }
}

export async function getUserBounties() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user.id) {
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
