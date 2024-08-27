import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import db from '@/db';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const session = await getServerSession(authOptions);
  if (!session || !session?.user || !code) {
    return NextResponse.json({}, { status: 401 });
  }

  const clientID = process.env.GITHUB_ID;
  const clientSecret = process.env.GITHUB_SECRET;
  const redirectURI = process.env.GITHUB_REDIRECT_URI;
  try {
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: clientID,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectURI,
      },
      {
        headers: { Accept: 'application/json' },
      },
    );
    const accessToken = tokenResponse.data.access_token;

    const emailResponse = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });

    const emails = emailResponse.data;
    const primaryEmail = emails.html_url;
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        github: primaryEmail,
      },
    });

    return NextResponse.redirect(`${process.env.SITE_URL}/payout-methods`, {
      status: 302,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 },
    );
  }
}
