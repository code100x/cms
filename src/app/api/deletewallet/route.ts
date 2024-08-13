import db from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const deleteWalletSchema = z.object({
  payoutType: z.enum(['upi', 'solana']),
  id: z.number(),
});

export const handleDeleteUpiAddress = async (userId: string, id: number) => {
  return db.user.update({
    where: {
      id: userId,
    },
    data: {
      upis: {
        delete: {
          id,
        },
      },
    },
  });
};

export const handleDeleteSolanaAddress = async (userId: string, id: number) => {
  return db.user.update({
    where: {
      id: userId,
    },
    data: {
      solanaAddresses: {
        delete: {
          id,
        },
      },
    },
  });
};

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({
        error: 'Unauthorized!',
      });
    }

    const parsedBody = deleteWalletSchema.safeParse(await req.json());

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.message },
        { status: 400 },
      );
    }

    const { payoutType, id } = parsedBody.data;
    const userId = session.user.id;

    if (payoutType === 'upi') {
      await handleDeleteUpiAddress(userId, id);
      return NextResponse.json({ message: 'UPI added successfully!' });
    } else if (payoutType === 'solana') {
      await handleDeleteSolanaAddress(userId, id);
      return NextResponse.json({
        message: 'Solana address added successfully!',
      });
    }
  } catch (err) {
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : 'An unexpected error occurred',
      },
      { status: 500 },
    );
  }
}
