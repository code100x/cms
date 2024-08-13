import db from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const requestBodySchema = z.object({
  payoutType: z.enum(['upi', 'solana']),
  address: z.string(),
});

async function handleCreateUpiAddress(userId: string, address: string) {
  return db.user.update({
    where: { id: userId },
    data: {
      upis: {
        create: { address },
      },
    },
  });
}

async function handleCreateSolanaAddress(userId: string, address: string) {
  return db.user.update({
    where: { id: userId },
    data: {
      solanaAddresses: {
        create: { address },
      },
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const parsedBody = requestBodySchema.safeParse(await req.json());
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!parsedBody.success) {
      return NextResponse.json(
        { error: parsedBody.error.message },
        { status: 400 },
      );
    }

    const { payoutType, address } = parsedBody.data;
    const userId = session.user.id;

    if (payoutType === 'upi') {
      await handleCreateUpiAddress(userId, address);
      return NextResponse.json({ message: 'UPI added successfully!' });
    } else if (payoutType === 'solana') {
      await handleCreateSolanaAddress(userId, address);
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
