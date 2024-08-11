import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React from 'react';

export function WalletAddress({ children }: { children: React.ReactNode }) {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="grid gap-4">
        <div className="mb-3 mt-5 flex items-center justify-between rounded-md border border-muted bg-background px-4 py-3">
          <div className="text-sm text-muted-foreground">{children}</div>
        </div>
        <div className="flex justify-end">
          <Button className="w-full max-w-[200px]">Payout</Button>
        </div>
      </CardContent>
    </Card>
  );
}
