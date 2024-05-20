import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';
import {
  formatINR,
  formatUSD,
  getCurrencyRate,
  sendBountyComment,
} from '@/utiles/bounty';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const USD_amount = +body.bountyAmount.split('$')[1];
  const PR_By = body.author;
  const PR_Link = body.pr_link;
  const repo_owner = body.repo_owner;
  const repoName = PR_Link.split('/')[4];
  const PR_No: string = PR_Link.split('/')[6];
  const username = body.username;
  const PR_Title = body.PR_Title;

  try {
    const INR_amount = await getCurrencyRate(USD_amount);
    const commentBody = `💰Congratulation @${PR_By} for winning ${formatUSD.format(USD_amount).split('.')[0]} (${formatINR.format(INR_amount).split('.')[0]}) bounty.\n👉 To claim visit https://app.100xdevs.com/bounty.\n🐥Keep contributing.`;

    const findBountyInfo = await db.bountyInfo.findUnique({
      where: { PR_Link },
    });

    if (findBountyInfo) {
      const commentBody = `[Duplicate]\n💰Bounty worth ${formatUSD.format(findBountyInfo.USD_amount).split('.')[0]} (${formatINR.format(findBountyInfo.INR_amount).split('.')[0]}) is already created to @${PR_By} for this PR.\n👉 To claim visit https://app.100xdevs.com/bounty.\n🐥Keep contributing.`;
      sendBountyComment({ repo_owner, repoName, PR_No, commentBody });
      return NextResponse.json(
        { message: 'duplicate bounty message' },
        { status: 401 },
      );
    }

    const findUser = await db.githubUser.findUnique({
      where: { username },
    });

    if (findUser) {
      const addBountyInfo = await db.bountyInfo.create({
        data: {
          username,
          PR_Title,
          PR_Link,
          repoName,
          USD_amount,
          INR_amount,
          githubUserId: findUser.userId,
        },
      });
      if (addBountyInfo) {
        sendBountyComment({ repo_owner, repoName, PR_No, commentBody });
      }
    } else {
      const addBountyInfo = await db.bountyInfo.create({
        data: {
          username,
          PR_Title,
          PR_Link,
          repoName,
          USD_amount,
          INR_amount,
        },
      });
      if (addBountyInfo) {
        sendBountyComment({ repo_owner, repoName, PR_No, commentBody });
      }
    }
    return NextResponse.json({ message: 'success' }, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: 'Error while updating database' },
      { status: 401 },
    );
  }
}
