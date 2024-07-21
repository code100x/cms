import { giveAccess } from '@/utiles/discord';
import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import { getServerSession } from 'next-auth';
import { getPurchases } from '@/utiles/appx';
import { authOptions } from '@/lib/auth';

const COHORT3_GUILD_ID = '1263912990160457738';

const WEB_DEV_ROLES: string[] = [
  '1264391883430559876',
  '1264392008320155762',
  '1264392051546656859',
  '1264392084815609940',
  '1264392128394559488',
  '1264392177698476084',
];

const DEVOPS_ROLES: string[] = [
  '1264392230656016554',
  '1264392271659536435',
  '1264392305150918800',
  '1264392311476064369',
];

const WEB3_ROLES: string[] = [
  '1264392415280627742',
  '1264392533484634202',
  '1264392567571878039',
  '1264392616171016334',
];

const COHORT3_APPX_IDS = ['12', '13', '14', '15', '16'];

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const data = await req.json();

  if (!session || !session?.user) {
    return NextResponse.json({}, { status: 401 });
  }

  const discordBulkConnect = await db.discordConnectBulk.findFirst({
    where: {
      userId: session.user.id,
      cohortId: '3',
    },
  });

  if (discordBulkConnect) {
    return NextResponse.json(
      {
        msg: `You have already connected your discord account with username ${discordBulkConnect.username}. We only allow one discord connection per account. If you ended up leaving the server by mistake, please contact us in the main discord or email at 100xdevs@gmail.com`,
      },
      { status: 401 },
    );
  }

  const purchases = (await getPurchases(session.user.email || '')).filter(
    (purchase: any) => COHORT3_APPX_IDS.includes(purchase.appxCourseId),
  );

  const purchaseCourseIds = purchases.map(
    (purchase: any) => purchase.appxCourseId,
  );
  const roles: string[] = [];

  let hasWebDev = false;
  let hasDevOps = false;
  let hasWeb3 = false;

  if (
    purchaseCourseIds.includes('12') ||
    purchaseCourseIds.includes('14') ||
    purchaseCourseIds.includes('15')
  ) {
    hasWebDev = true;
  }

  if (
    purchaseCourseIds.includes('12') ||
    purchaseCourseIds.includes('14') ||
    purchaseCourseIds.includes('16')
  ) {
    hasDevOps = true;
  }

  if (purchaseCourseIds.includes('13') || purchaseCourseIds.includes('14')) {
    hasWeb3 = true;
  }

  if (hasWebDev) {
    roles.push(WEB_DEV_ROLES[Math.floor(Math.random() * WEB_DEV_ROLES.length)]);
  }

  if (hasDevOps) {
    roles.push(DEVOPS_ROLES[Math.floor(Math.random() * DEVOPS_ROLES.length)]);
  }

  if (hasWeb3) {
    roles.push(WEB3_ROLES[Math.floor(Math.random() * WEB3_ROLES.length)]);
  }

  if (!purchases.length) {
    return NextResponse.json(
      { msg: 'You have not bought a course yet' },
      { status: 401 },
    );
  }
  //@ts-ignore
  const { discordId, discordUsername } = await giveAccess(
    data.code,
    roles,
    COHORT3_GUILD_ID,
    process.env.COHORT3_BOT_TOKEN ?? '',
    process.env.COHORT3_DISCORD_ACCESS_KEY ?? '',
    process.env.COHORT3_DISCORD_ACCESS_SECRET ?? '',
    process.env.COHORT3_DISCORD_REDIRECT_URI ?? '',
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
      cohortId: '3',
    },
  });

  return NextResponse.json({});
}
