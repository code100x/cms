'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash, ChevronDown, ChevronUp } from 'lucide-react';
import { deleteSolanaAddress, deleteUpiId } from '@/actions/payoutMethods';
import { SolanaAddress, UpiId } from '@prisma/client';
import { useAction } from '@/hooks/useAction';
import { toast } from 'sonner';
import NewPayoutDialog from '@/components/NewPayoutDialog';

interface PaymentMethodsDropdownProps {
  upiAddresses: UpiId[] | undefined;
  solanaAddresses: SolanaAddress[] | undefined;
  fetchPayoutMethods: () => void;
}

export default function PaymentMethodsDropdown({
  upiAddresses,
  solanaAddresses,
  fetchPayoutMethods,
}: PaymentMethodsDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isPayoutDialogOpen, setIsPayoutDialogOpen] = useState<boolean>(false);
  const [btnClicked, setBtnClicked] = useState<string>('');

  const { execute: executeDeleteUPI } = useAction(deleteUpiId, {
    onSuccess: () => {
      toast.success('UPI Address deleted successfully');
      fetchPayoutMethods();
    },
    onError: () => {
      toast.error('Failed to delete UPI address');
    },
  });

  const { execute: executeDeleteSolana } = useAction(deleteSolanaAddress, {
    onSuccess: () => {
      toast.success('Solana Address deleted successfully');
      fetchPayoutMethods();
    },
    onError: () => {
      toast.error('Failed to delete Solana address');
    },
  });

  const handleUpiDelete = (id: number) => {
    executeDeleteUPI({ id });
  };

  const handleSolanaDelete = (id: number) => {
    executeDeleteSolana({ id });
  };

  useEffect(() => {
    fetchPayoutMethods();
  }, [isPayoutDialogOpen]);

  return (
    <>
      <Button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="mt-5 flex w-full items-center justify-between py-2 text-white transition-colors duration-500 hover:bg-gray-900 dark:text-black dark:hover:bg-gray-700"
      >
        {isDropdownOpen ? (
          <>
            <span>Hide Your Details</span>
            <ChevronUp className="ml-2" />
          </>
        ) : (
          <>
            <span>Edit Your Payment Details</span>
            <ChevronDown className="ml-2" />
          </>
        )}
      </Button>

      {isDropdownOpen && (
        <div className="w-full px-2 py-8 sm:px-0">
          <div className="mb-8">
            <div className="flex w-[90vw] justify-between">
              <p className="py-2 font-semibold">UPI Addresses</p>
              {upiAddresses && upiAddresses.length < 2 && (
                <Button
                  id="UPI"
                  size="sm"
                  className="light:text-black sticky rounded-md bg-black p-3 text-white transition-colors duration-500 hover:bg-[#242424] dark:bg-white dark:text-black hover:dark:bg-white"
                  onClick={() => {
                    setIsPayoutDialogOpen(true);
                    setBtnClicked('UPI');
                  }}
                >
                  Add UPI Address
                </Button>
              )}
            </div>
            <div className="flex w-[90vw] flex-col sm:w-3/6">
              {upiAddresses && upiAddresses.length !== 0 ? (
                upiAddresses?.map((upi) => (
                  <div
                    key={upi.id}
                    className="flex items-center justify-between py-2"
                  >
                    <p className="w-1/2 overflow-hidden text-ellipsis whitespace-nowrap sm:w-full">
                      {upi.value}
                    </p>
                    <Button
                      className="mx-3 text-red-600 hover:text-red-800"
                      size="iconSM"
                      variant="outline"
                      onClick={() => handleUpiDelete(upi.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="py-3">No UPI addresses added yet!</p>
              )}
            </div>
          </div>

          <div>
            <div className="flex w-[90vw] justify-between">
              <p className="py-2 font-semibold">Solana Addresses</p>
              {solanaAddresses && solanaAddresses.length < 2 && (
                <Button
                  id="Solana"
                  size="sm"
                  className="light:text-black sticky rounded-md bg-black p-3 text-white transition-colors duration-500 hover:bg-[#242424] dark:bg-white dark:text-black hover:dark:bg-white"
                  onClick={() => {
                    setIsPayoutDialogOpen(true);
                    setBtnClicked('Solana');
                  }}
                >
                  Add SOL Address
                </Button>
              )}
            </div>
            <div className="flex w-[90vw] flex-col sm:w-3/6">
              {solanaAddresses?.length !== 0 ? (
                solanaAddresses?.map((sol) => (
                  <div
                    key={sol.id}
                    className="flex items-center justify-between py-2"
                  >
                    <p className="w-1/2 overflow-hidden text-ellipsis whitespace-nowrap sm:w-full">
                      {sol.value}
                    </p>
                    <Button
                      className="mx-3 text-red-600 hover:text-red-800"
                      size="iconSM"
                      variant="outline"
                      onClick={() => handleSolanaDelete(sol.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="py-3">No Solana addresses added yet!</p>
              )}
            </div>
          </div>
        </div>
      )}

      <NewPayoutDialog
        isOpen={isPayoutDialogOpen}
        onClose={() => setIsPayoutDialogOpen(false)}
        title={btnClicked}
      />
    </>
  );
}
