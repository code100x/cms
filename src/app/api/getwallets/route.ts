import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(
      {
        message: 'Unauthorized!',
      },
      { status: 403 },
    );
  }

  const wallets = await prisma.user.findFirst({
    where: {
      id: session.user.id,
    },
    select: {
      upis: true,
      solanaAddresses: true,
    },
  });

  return NextResponse.json({
    upiWallets: wallets?.upis,
    solanaWallets: wallets?.solanaAddresses,
  });
}
