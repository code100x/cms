import prisma from '@/db';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  const session = await getServerSession(authOptions);

  if (!session?.user?.id || !code) {
    return NextResponse.redirect(
      new URL('/payout-methods?error=invalid_session', req.url),
    );
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch(
      'https://github.com/login/oauth/access_token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: process.env.GITHUB_ID,
          client_secret: process.env.GITHUB_SECRET,
          code,
        }),
      },
    );

    const tokenData = await tokenResponse.json();
    console.log('Token data:', tokenData);

    if (tokenData.error) {
      throw new Error(tokenData.error_description);
    }

    // Get user info from GitHub
    const userResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${tokenData.access_token}`,
      },
    });

    const userData = await userResponse.json();
    console.log('User data:', userData);

    const existingLink = await prisma.gitHubLink.findUnique({
      where: { userId: session.user.id },
    });

    if (!existingLink) {
      await prisma.gitHubLink.create({
        data: {
          userId: session.user.id,
          githubId: userData.id.toString(),
          username: userData.login,
          access_token: tokenData.access_token,
          avatarUrl: userData.avatar_url,
          profileUrl: userData.html_url,
        },
      });
    } else {
      return NextResponse.redirect(
        new URL('/payout-methods?github_linked=true', req.url),
      );
    }

    return NextResponse.redirect(
      new URL('/payout-methods?github_linked=true', req.url),
    );
  } catch (error) {
    console.error('Error linking GitHub:', error);
    return NextResponse.redirect(
      new URL('/payout-methods?error=github_link_failed', req.url),
    );
  }
}
