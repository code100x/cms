'use client';
import { useState, useEffect } from 'react';
import { useAction } from '@/hooks/useAction';
import { toast } from 'sonner';
import {
  deleteSolanaAddress,
  deleteUpiId,
  getPayoutMethods,
} from '@/actions/payoutMethods';
import { SolanaAddress, UpiId } from '@prisma/client';

export const usePayoutMethods = () => {
  const [upiAddresses, setUpiAddresses] = useState<UpiId[] | undefined>([]);
  const [solanaAddresses, setSolanaAddresses] = useState<
    SolanaAddress[] | undefined
  >([]);

  const fetchPayoutMethods = async () => {
    const result = await getPayoutMethods();
    if (result) {
      setUpiAddresses(result.upiIds);
      setSolanaAddresses(result.solanaAddresses);
    }
  };

  const { execute: executeDeleteUPI } = useAction(deleteUpiId, {
    onSuccess: () => {
      toast.success('UPI Address deleted successfully');
      fetchPayoutMethods();
    },
    onError: () => {
      toast.error('Failed to delete UPI id');
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

  useEffect(() => {
    fetchPayoutMethods();
  }, []);

  return {
    upiAddresses,
    solanaAddresses,
    fetchPayoutMethods,
    handleUpiDelete: (id: number) => executeDeleteUPI({ id }),
    handleSolanaDelete: (id: number) => executeDeleteSolana({ id }),
  };
};
