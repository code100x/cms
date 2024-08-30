'use client';
import { useEffect, useState } from 'react';
import NewPayoutDialog from '@/components/NewPayoutDialog';
import { GitHubLinkButton } from '@/components/GitHubLinkButton';
import SOL from "../../../public/platform/sol.svg"
import UPI from "../../../public/platform/upi.svg"
import { PayoutMethodCard } from '@/components/PaymentMethodCard';
import { usePayoutMethods } from '@/hooks/usePayoutMethod';

export default function Page() {
  const [isDialogBoxOpen, setIsDialogBoxOpen] = useState<boolean>(false);
  const [btnClicked, setBtnClicked] = useState<string>('');
  const { upiAddresses, solanaAddresses, handleUpiDelete, handleSolanaDelete, fetchPayoutMethods } = usePayoutMethods();

  const openDialog = (method: string) => {
    setIsDialogBoxOpen(true);
    setBtnClicked(method);
  };

  useEffect(() => {
    fetchPayoutMethods();
  }, [isDialogBoxOpen])

  const closeDialog = () => setIsDialogBoxOpen(false);

  return (
    <div className="h-max pb-4 transition-colors duration-500 md:p-8">
      <div className="mb-6 flex flex-col items-start justify-center px-4 pt-3 sm:px-8">
        <div className="text-3xl text-black my-2 mb-6 transition-colors duration-500 dark:text-white">
          <h1 className="text-black dark:text-white font-semibold">Payout Methods</h1>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 w-full md:grid-cols-3 gap-4'>
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

        <div className='w-full my-8'>
          <h2 className='text-3xl my-4 font-semibold'>Apps</h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 w-full  md:grid-cols-3 gap-4'>
            <GitHubLinkButton />
          </div>

        </div>

      </div>
    </div>
  );
}
