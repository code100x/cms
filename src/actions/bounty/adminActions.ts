'use server';
import prisma from '@/db';
import { adminApprovalSchema } from './schema';
import { AdminApprovalData } from './types';

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
  bounties: Bounty[];
  totalINRBounties: number;
  totalSOLBounties: number;
};

export async function approveBounty(data: AdminApprovalData) {
  const validatedData = adminApprovalSchema.parse(data);

  const updatedBounty = await prisma.bountySubmission.update({
    where: { id: validatedData.bountyId },
    data: { status: validatedData.status },
  });

  return updatedBounty;
}

export async function getBounties(): Promise<BountyResponse> {
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
}

export async function deleteBounty(bountyId: string) {
  const deleteBounty = await prisma.bountySubmission.delete({
    where: { id: bountyId },
  });
  return { success: !!deleteBounty };
}

export async function confirmBounty(bountyId: string, amount: number) {
  const updatedBounty = await prisma.bountySubmission.update({
    where: { id: bountyId },
    data: { status: 'confirmed', amount },
  });

  return { success: !!updatedBounty };
}
