import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const clientId = process.env.GITHUB_ID;
    const redirectUri = `${process.env.NEXTAUTH_URL}/api/github/callback`;
    const scope = 'read:user user:email';

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    return NextResponse.redirect(githubAuthUrl);
}