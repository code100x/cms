'use client';

import { Button } from '@repo/ui/shad/button';

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
