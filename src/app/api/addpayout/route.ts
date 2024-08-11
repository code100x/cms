import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const requestBodySchema = z.object({
  payoutType: z.string(),
  address: z.string(),
});

export async function POST(req: NextRequest) {
  const parsedBody = requestBodySchema.safeParse(await req.json());
  const session = await getServerSession(authOptions);

  if (!session || !session?.user) {
    return NextResponse.json({}, { status: 401 });
  }

  if (!parsedBody.success) {
    return NextResponse.json(
      { error: parsedBody.error.message },
      { status: 403 },
    );
  }

  if (parsedBody.data.payoutType === 'upi') {
    try {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          upis: {
            create: {
              address: parsedBody.data.address,
            },
          },
        },
        select: {
          upis: true,
        },
      });

      return NextResponse.json({
        message: 'UPI added successfully!',
      });
    } catch (err) {
      return NextResponse.json(
        {
          error: err instanceof Error ? err.message : '',
        },
        {
          status: 403,
        },
      );
    }
  } else if (parsedBody.data.payoutType === 'solana') {
    try {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          solanaAddresses: {
            create: {
              address: parsedBody.data.address,
            },
          },
        },
      });
      return NextResponse.json({
        message: 'Solana address added successfully!',
      });
    } catch (err) {
      return NextResponse.json(
        {
          error: err instanceof Error ? err.message : '',
        },
        {
          status: 403,
        },
      );
    }
  }

  return NextResponse.json(
    {
      message: 'Invalid method input',
    },
    { status: 403 },
  );
}
