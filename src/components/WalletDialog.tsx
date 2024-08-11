'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useWallets } from '@/hooks/useWallets';
import { WalletAddress } from './Address';
import { Button } from './ui/button';

export const Wallets = () => {
  const { upiWallets, solanaWallets } = useWallets();
  return (
    <Dialog>
      <DialogTrigger>
        <Button variant={'outline'}>Show wallets</Button>
      </DialogTrigger>
      <DialogContent className="h-4/5 max-h-[60vh] overflow-y-auto">
        <DialogHeader className="space-y-5">
          <div className="space-y-3">
            <DialogTitle>UPI wallets</DialogTitle>
            <DialogDescription className="space-y-3">
              {upiWallets?.map((wallet) => (
                <WalletAddress>{wallet.address}</WalletAddress>
              ))}
            </DialogDescription>
          </div>
          <div className="space-y-3">
            <DialogTitle>Solana wallets</DialogTitle>
            <DialogDescription className="space-y-3">
              {solanaWallets?.map((wallet) => (
                <WalletAddress>{wallet.address}</WalletAddress>
              ))}
            </DialogDescription>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
