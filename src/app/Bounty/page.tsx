'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import PaymentMethodsDropdown from '@/components/PaymentDropdown';
import { SolanaAddress, UpiId, BountySubmission } from '@prisma/client';
import BountySubmissionDialog from '@/components/bounty/BountySubmissionDialog';
import { getPayoutMethods } from '@/actions/payoutMethods';
import { getUserBounties } from '@/actions/bounty';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function Page() {
  const [isBountyDialogOpen, setIsBountyDialogOpen] = useState<boolean>(false);
  const [upiAddresses, setUpiAddresses] = useState<UpiId[] | undefined>([]);
  const [solanaAddresses, setSolanaAddresses] = useState<
    SolanaAddress[] | undefined
  >([]);
  const [bounties, setBounties] = useState<BountySubmission[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchPayoutMethods = async () => {
    const result = await getPayoutMethods();
    if (result) {
      setUpiAddresses(result.upiIds);
      setSolanaAddresses(result.solanaAddresses);
      setIsLoading(false);
    }
  };

  const fetchUserBounties = async () => {
    setIsLoading(true);
    try {
      const userBounties = await getUserBounties();

      const sortedBounties = userBounties.sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });

      setBounties(sortedBounties);
    } catch (error) {
      toast.error('Failed to fetch bounties');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPayoutMethods();
    fetchUserBounties();
  }, []);

  const handleBountyDialogOpen = () => {
    if (upiAddresses?.length || solanaAddresses?.length) {
      setIsBountyDialogOpen(true);
    } else {
      toast.error('Add at least 1 payment method');
    }
  };

  const handleBountyDialogClose = () => {
    setIsBountyDialogOpen(false);
    fetchUserBounties();
  };

  return (
    <>
      <div className="h-max pb-4 transition-colors duration-500 md:p-8">
        <div className="mb-6 flex flex-col items-start justify-center px-4 pt-3 sm:px-8">
          <div className="text-2xl text-black transition-colors duration-500 dark:text-white sm:text-3xl">
            <h1 className="mt-20 text-black dark:text-white sm:mt-16">
              Your Bounties
            </h1>
          </div>

          <PaymentMethodsDropdown
            upiAddresses={upiAddresses}
            solanaAddresses={solanaAddresses}
            fetchPayoutMethods={fetchPayoutMethods}
          />

          <Button className="mt-5" onClick={handleBountyDialogOpen}>
            Submit Bounty
          </Button>

          <BountySubmissionDialog
            isOpen={isBountyDialogOpen}
            onClose={handleBountyDialogClose}
            upiAddresses={upiAddresses}
            solanaAddresses={solanaAddresses}
          />

          {isLoading &&
            Array.from({ length: 10 }, (_, index) => (
              <Skeleton key={index} className="mt-8 h-28 w-full" />
            ))}

          {!isLoading && bounties.length > 0 && (
            <div className="mt-8 w-full">
              <h2 className="mb-4 text-xl font-semibold">My Submissions</h2>
              <div className="space-y-4">
                {bounties.map((bounty) => (
                  <div
                    key={bounty.id}
                    className={`rounded-lg border p-4 ${
                      bounty.status === 'confirmed'
                        ? 'border-green-500 bg-green-100 dark:bg-green-900'
                        : 'border-gray-300 dark:border-gray-700 dark:bg-gray-800'
                    }`}
                  >
                    <p>
                      <span className="font-semibold">PR Link:</span>{' '}
                      <a
                        href={bounty.prLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-blue-500 underline"
                      >
                        {bounty.prLink}
                      </a>
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{' '}
                      {bounty.status}
                    </p>
                    {bounty.status === 'confirmed' && (
                      <p>
                        <span className="font-semibold">Amount Received:</span>{' '}
                        {bounty.paymentMethod.includes('@')
                          ? `${bounty.amount} INR`
                          : `${bounty.amount} SOL`}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isLoading && bounties.length === 0 && (
            <p className="mt-8 text-center text-gray-500">
              No bounty submissions yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
