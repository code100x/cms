'use server';
import prisma from '@/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { ROLES } from '../types';

export type Bounty = {
  id: string;
  prLink: string;
  paymentMethod: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  amount: number;
  userId: string;
  user: {
    id: string;
    name: string | null;
  };
};

type BountyResponse = {
  bounties?: Bounty[];
  totalINRBounties?: number;
  totalSOLBounties?: number;
  error?: string;
};

export async function getBounties(): Promise<BountyResponse> {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== ROLES.ADMIN) {
    return { error: 'Unauthorized or insufficient permissions' };
  }

  try {
    const bounties = await prisma.bountySubmission.findMany({
      select: {
        id: true,
        prLink: true,
        paymentMethod: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        amount: true,
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    let totalINRBounties = 0;
    let totalSOLBounties = 0;

    bounties.forEach((bounty) => {
      if (bounty.paymentMethod.includes('@')) {
        totalINRBounties += bounty.amount || 0;
      } else {
        totalSOLBounties += bounty.amount || 0;
      }
    });

    return { bounties, totalINRBounties, totalSOLBounties };
  } catch (e) {
    return { error: 'An error occurred while approving the bounty.' };
  }
}

export async function deleteBounty(bountyId: string) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== ROLES.ADMIN) {
    return { error: 'Unauthorized or insufficient permissions' };
  }
  try {
    const deleteBounty = await prisma.bountySubmission.delete({
      where: { id: bountyId },
    });
    return { success: !!deleteBounty };
  } catch (e) {
    return { error: 'An error occurred while approving the bounty.' };
  }
}

export async function confirmBounty(bountyId: string, amount: number) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || session.user.role !== ROLES.ADMIN) {
    return { error: 'Unauthorized or insufficient permissions' };
  }

  try {
    const updatedBounty = await prisma.bountySubmission.update({
      where: { id: bountyId },
      data: { status: 'confirmed', amount },
    });

    if (updatedBounty) {
      return { success: true };
    }
    return { error: 'Failed to update bounty.' };
  } catch (e) {
    return { error: 'An error occurred while approving the bounty.' };
  }
}
