'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  getBounties,
  deleteBounty,
  confirmBounty,
  Bounty,
} from '@/actions/bounty/adminActions';
import { toast } from 'sonner';
import ConfirmedBountiesDialog from '@/components/bounty/admin-page/ConfirmedBountiesDialog';
import { ConfirmBountyDialog } from '@/components/bounty/admin-page/ConfirmBountyDialog';

export const AdminBountyPage = () => {
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [INRBounties, setINRBounties] = useState<number>(0);
  const [SOLBounties, setSOLBounties] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] =
    useState<boolean>(false);
  const [selectedBounty, setSelectedBounty] = useState<Bounty | null>(null);
  const [currency, setCurrency] = useState<'INR' | 'SOL'>('INR');

  const fetchBounties = async () => {
    setIsLoading(true);
    const result = await getBounties();
    if (result.error) {
      toast.error(result.error);
    } else {
      setBounties(result.bounties!);
      setINRBounties(result.totalINRBounties!);
      setSOLBounties(result.totalSOLBounties!);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBounties();
  }, []);

  const handleDelete = async (bounty: Bounty) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this bounty?',
    );
    if (confirmed) {
      const result = await deleteBounty(bounty.id);
      if (result.success) {
        toast.success('Bounty deleted successfully.');
        setBounties(bounties.filter((b) => b.id !== bounty.id));
      } else {
        toast.error('Failed to delete bounty.');
      }
    }
  };

  const handleConfirm = (bounty: Bounty) => {
    const paymentMethod = bounty.paymentMethod.includes('@') ? 'INR' : 'SOL';
    setSelectedBounty(bounty);
    setCurrency(paymentMethod);
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmBountyDialog = async (amount: number) => {
    if (selectedBounty) {
      const result = await confirmBounty(selectedBounty.id, amount);

      if (result.success) {
        toast.success('Bounty confirmed successfully.');
        if (currency === 'INR') {
          setINRBounties((prevTotal) => prevTotal + amount);
        } else {
          setSOLBounties((prevTotal) => prevTotal + amount);
        }
        setSelectedBounty(null);
        setIsConfirmDialogOpen(false);
        fetchBounties();
      } else {
        toast.error(result.error);
      }
    }
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const confirmedBounties = bounties.filter(
    (bounty) => bounty.status === 'confirmed',
  );

  return (
    <>
      <div className="h-max pb-4 transition-colors duration-500 md:p-8">
        <div className="mb-6 flex flex-col items-start justify-center px-4 pt-3 sm:px-8">
          <h1 className="mt-20 text-black dark:text-white">
            Admin Bounty Management
          </h1>
          <h2 className="mt-2 text-xl text-black dark:text-white">
            Total Bounties Distributed: INR {INRBounties.toFixed(2)} | SOL{' '}
            {SOLBounties}
          </h2>
          <Button onClick={openDialog} className="my-4">
            Show Confirmed Bounties
          </Button>
          {isLoading ? (
            Array.from({ length: 10 }, (_, index) => (
              <Skeleton key={index} className="mt-8 h-28 w-full" />
            ))
          ) : (
            <div className="w-full">
              {bounties.map(
                (bounty) =>
                  bounty.status === 'pending' && (
                    <div
                      key={bounty.id}
                      className="mt-4 flex items-center justify-between rounded bg-gray-100 p-4 dark:bg-gray-800"
                    >
                      <div className="items-center">
                        <div className="text-gray-700 dark:text-gray-300">
                          {bounty.user?.name}
                        </div>
                        <a
                          href={bounty.prLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-all text-blue-600 hover:underline dark:text-blue-400"
                        >
                          {bounty.prLink}
                        </a>
                        <div className="text-lg text-gray-700 dark:text-gray-300">
                          Address: {bounty.paymentMethod}
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Button onClick={() => handleConfirm(bounty)}>
                          Confirm
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDelete(bounty)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ),
              )}
            </div>
          )}
        </div>
      </div>
      <ConfirmedBountiesDialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        bounties={confirmedBounties}
      />
      <ConfirmBountyDialog
        isOpen={isConfirmDialogOpen}
        setIsOpen={setIsConfirmDialogOpen}
        onClose={() => setIsConfirmDialogOpen(false)}
        onConfirm={handleConfirmBountyDialog}
        currency={currency}
      />
    </>
  );
};

export default AdminBountyPage;
