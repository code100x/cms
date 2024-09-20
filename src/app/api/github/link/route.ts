import { env } from '@/env';
import { NextResponse } from 'next/server';

export async function GET() {
  const clientId = env.GITHUB_ID;
  const redirectUri = `${env.NEXTAUTH_URL}/api/github/callback`;
  const scope = 'read:user user:email';

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

  return NextResponse.redirect(githubAuthUrl);
}
