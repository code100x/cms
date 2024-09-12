'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

let solved = false;

export default function DiscordOauthRedirect() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  const updateDiscordUser = async (code: string) => {
    try {
      const response = await fetch('/api/discord/redirect/cohort3', {
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
    if (code && !solved) {
      solved = true;
      updateDiscordUser(code);
    }
  }, [code]);

  if (loading) {
    return (
      <div className="flex h-screen flex-col justify-center">
        <div className="flex justify-center">Adding you to discord...</div>
      </div>
    );
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
        <p>Discord connected!</p>
      </div>
    </div>
  );
}
