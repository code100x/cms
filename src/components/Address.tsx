import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import React from 'react';
import { useWallets } from '@/hooks/useWallets';

export function WalletAddress({
  address,
  typeOfWallet,
  id,
}: {
  address: string;
  typeOfWallet: 'upi' | 'solana';
  id: number;
}) {
  const { deleteWallet, setRefreshTrigger } = useWallets();

  const handleDelete = async () => {
    await deleteWallet(typeOfWallet, id);
    setRefreshTrigger((c) => c + 1);
  };
  return (
    <Card className="w-full max-w-md">
      <CardContent className="grid gap-4">
        <div className="mb-3 mt-5 flex items-center justify-between rounded-md border border-muted bg-background px-4 py-3">
          <div className="text-slate-300text-muted-foreground text-sm">
            {address}
          </div>
        </div>
        <div className="flex justify-between">
          <Button
            variant={'destructive'}
            className="w-full max-w-[150px]"
            onClick={handleDelete}
          >
            Delete wallet
          </Button>
          <Button className="w-full max-w-[150px]">Payout</Button>
        </div>
      </CardContent>
    </Card>
  );
}
