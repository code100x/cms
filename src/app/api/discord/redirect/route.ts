import { giveAccess } from '@/utiles/discord';
import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { getServerSession } from 'next-auth';
import { getPurchases } from '@/utiles/appx';
import { authOptions } from '@/lib/auth';

const ROLES = [
  '1175845469335859271',
  '1175845350293110794',
  '1175845264871923712',
  '1175845224451407943',
  '1175845180851638365',
  '1175845137566412830',
  '1175845078384787456',
  '1175845023561027706',
  '1175844979344683008',
  '1175844912554590289',
  '1175844866605989998',
  '1175844803733377155',
  '1175843700144869416',
  '1175843634399150111',
  '1175843582037467186',
];

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
  console.log(
    data.code,
    [
      ...purchases.map((purchase: any) => purchase.discordRoleId),
      ROLES[Math.floor(Math.random() * ROLES.length)],
    ],
    process.env.GUILD_ID ?? '',
    process.env.BOT_TOKEN ?? '',
    process.env.DISCORD_ACCESS_KEY ?? '',
    process.env.DISCORD_ACCESS_SECRET ?? '',
    process.env.DISCORD_REDIRECT_URI ?? '',
  );
  //@ts-ignore
  const { discordId, discordUsername } = await giveAccess(
    data.code,
    [
      ...purchases.map((purchase: any) => purchase.discordRoleId),
      ROLES[Math.floor(Math.random() * ROLES.length)],
    ],
    process.env.GUILD_ID ?? '',
    process.env.BOT_TOKEN ?? '',
    process.env.DISCORD_ACCESS_KEY ?? '',
    process.env.DISCORD_ACCESS_SECRET ?? '',
    process.env.DISCORD_REDIRECT_URI ?? '',
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
