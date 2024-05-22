'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DiscordOauthRedirect() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const discordError = searchParams.get('error');

  const updateDiscordUser = async (code: string) => {
    try {
      const response = await fetch('/api/discord/redirect', {
        method: 'POST',
        body: JSON.stringify({
          code,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        const responseText = await response.json();
        setError(
          responseText.msg ||
            'Error while connecting discord. Please contact us in discord or mail at 100xdevs@gmail.com',
        );
      } else {
        window.location.href = '/';
      }
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (code) {
      updateDiscordUser(code);
    }
    if (discordError) {
      setLoading(false);
      setError(discordError);
    }
  }, [code, discordError]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <h1>Discord connected!</h1>
      </div>
    </div>
  );
}
