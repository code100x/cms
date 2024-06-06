import { giveAccess } from '@/utiles/discord';
import { NextRequest, NextResponse } from 'next/server';
import db from '@repo/db/client';
import { getServerSession } from 'next-auth';
import { getPurchases } from '@/utiles/appx';
import { authOptions } from '@repo/common/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const data = await req.json();

  if (!session || !session?.user) {
    return NextResponse.json({}, { status: 401 });
  }

  const purchases = await getPurchases(session.user.email || '');

  if (!purchases.length) {
    return NextResponse.json(
      { msg: 'You have not bought a course yet' },
      { status: 401 },
    );
  }
  //@ts-ignore
  const { discordId, discordUsername } = await giveAccess(
    data.code,
    purchases.map((purchase: any) => purchase.discordRoleId),
  );
  if (!discordId || !discordUsername) {
    return NextResponse.json(
      { msg: 'Something went wrong while connecting your discord account' },
      { status: 401 },
    );
  }

  await db.discordConnectBulk.create({
    data: {
      username: discordUsername,
      //@ts-ignore
      userId: session.user.id,
      discordId,
    },
  });

  return NextResponse.json({});
}
