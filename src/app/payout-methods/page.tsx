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
    <div className="h-max pb-4 transition-colors duration-500 md:p-8">
      <div className="mb-6 flex flex-col items-start justify-center px-4 md:pt-20 pt-24 sm:px-8">
        <div className="my-2 mb-6 text-3xl text-black transition-colors duration-500 dark:text-white">
          <h1 className="font-semibold text-black dark:text-white">
            Payout Methods
          </h1>
        </div>

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

        <div className="my-8 w-full">
          <h2 className="my-4 text-3xl font-semibold">Apps</h2>
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <GitHubLinkButton />
          </div>
        </div>
      </div>
    </div>
  );
}
