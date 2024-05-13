'use client';

import { Button } from '@/components/ui/button';

export const JoinDiscordButton = ({ oAuthUrl }: { oAuthUrl: string }) => {
  return (
    <Button
      onClick={() => {
        window.location.href = oAuthUrl;
      }}
    >
      Join Discord
    </Button>
  );
};
