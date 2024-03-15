import { extractBounty } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const githubActionType = data.action;
  const isPR = data.issue.pull_request ? true : false;
  const PRTitle = data.issue.title;
  const PRURL = data.issue.html_url;
  const benefactor = data.comment.user.login; // hkirat
  const benefactorComment = data.comment.body;
  const bounty = extractBounty(benefactorComment);
  const bountyWinner = data.issue.user.login;
  const bountyWinnerProfile = data.issue.user.url;

  if (
    githubActionType === 'created' &&
    isPR &&
    bounty &&
    benefactor === 'hkirat'
  ) {
    const message = `:moneybag:  Congratulations, [${bountyWinner}](<${bountyWinnerProfile}>)! You've won a bounty of $${bounty} for working on [${PRTitle}](<${PRURL}>).`;
    await pushNotification(message);
  }

  return NextResponse.json({});
}

async function pushNotification(content: any) {
  const DISCORD_WEBHOOK = process.env.DISCORD_BOUNTY_WEBHOOK;
  if (!DISCORD_WEBHOOK) {
    return;
  }
  const post = {
    content,
  };
  const config = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(post),
  };
  await fetch(DISCORD_WEBHOOK, config);
}
