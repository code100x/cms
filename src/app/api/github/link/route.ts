import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const clientId = process.env.GITHUB_ID;
    const nextAuthUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const redirectUri = `${nextAuthUrl}/api/github/callback`;
    const scope = 'read:user user:email';

    if (!clientId) {
      console.error('GitHub OAuth client ID is not configured');
      return NextResponse.redirect(new URL('/payout-methods?error=github_link_failed', nextAuthUrl));
    }

    console.log('Redirecting to GitHub OAuth:', { 
      clientId, 
      redirectUri, 
      scope,
      nextAuthUrl 
    });
    
    // Encode the redirectUri to ensure it's properly formatted
    const encodedRedirectUri = encodeURIComponent(redirectUri);
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodedRedirectUri}&scope=${scope}`;
    
    console.log('Final GitHub Auth URL:', githubAuthUrl);
    
    return NextResponse.redirect(githubAuthUrl);
  } catch (error) {
    console.error('Error in GitHub link API:', error);
    return NextResponse.redirect(new URL('/payout-methods?error=github_link_failed', process.env.NEXTAUTH_URL || 'http://localhost:3000'));
  }
}
