'use client';
import { useEffect, useState } from 'react';
import NewPayoutDialog from '@/components/NewPayoutDialog';
import { GitHubLinkButton } from '@/components/GitHubLinkButton';
import SOL from '../../../public/platform/sol.svg';
import UPI from '../../../public/platform/upi.svg';
import { PayoutMethodCard } from '@/components/PaymentMethodCard';
import { usePayoutMethods } from '@/hooks/usePayoutMethod';

export default function Page() {
  const [isDialogBoxOpen, setIsDialogBoxOpen] = useState<boolean>(false);
  const [btnClicked, setBtnClicked] = useState<string>('');
  const {
    upiAddresses,
    solanaAddresses,
    handleUpiDelete,
    handleSolanaDelete,
    fetchPayoutMethods,
  } = usePayoutMethods();

  const openDialog = (method: string) => {
    setIsDialogBoxOpen(true);
    setBtnClicked(method);
  };

  useEffect(() => {
    fetchPayoutMethods();
  }, [isDialogBoxOpen]);

  const closeDialog = () => setIsDialogBoxOpen(false);

  return (
    <div className="wrapper">
      <div className="flex flex-col gap-8">
        <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
          Payout Methods
        </h2>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <PayoutMethodCard
            title="UPI Address"
            description="Add your UPI ID"
            imageSrc={UPI}
            addresses={upiAddresses}
            id={'UPI'}
            onAdd={openDialog}
            onDelete={handleUpiDelete}
          />
          <PayoutMethodCard
            title="Solana Address"
            id={'Solana'}
            description="Add your Solana wallet id"
            imageSrc={SOL}
            addresses={solanaAddresses}
            onAdd={openDialog}
            onDelete={handleSolanaDelete}
          />
        </div>

        <NewPayoutDialog
          onClose={closeDialog}
          isOpen={isDialogBoxOpen}
          title={btnClicked}
        />

        <h2 className="text-2xl font-bold tracking-tighter md:text-3xl">
          Apps
        </h2>
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          <GitHubLinkButton />
        </div>
      </div>
    </div>
  );
}
