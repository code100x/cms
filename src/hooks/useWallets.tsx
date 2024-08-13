import { solanaWalletsState, upiWalletsState } from '@/store/atoms/wallets';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { toast } from 'sonner';

export type Wallets = {
  id: number;
  parentId: string;
  address: string;
  addedAt: Date;
};

type WalletsType = 'solana' | 'upi';

export const useWallets = () => {
  const [upiWallets, setUpiWallets] = useRecoilState(upiWalletsState);
  const [solanaWallets, setSolanaWallets] = useRecoilState(solanaWalletsState);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get('/api/getwallets');
      setUpiWallets([...res.data.upiWallets]);
      setSolanaWallets([...res.data.solanaWallets]);
    } catch (error) {
      console.error('Error fetching wallets:', error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  const addWallet = async (payoutType: WalletsType, address: string) => {
    try {
      await axios.post('/api/addpayout', {
        payoutType,
        address,
      });
      toast.success(
        `Added ${payoutType === 'upi' ? payoutType.toUpperCase() : payoutType} successfully!`,
      );
      setRefreshTrigger((prev) => prev + 1);
    } catch {
      toast.error('Error adding address!');
    }
  };

  const deleteWallet = async (payoutType: WalletsType, id: number) => {
    try {
      await axios.post('api/deletewallet', {
        payoutType,
        id,
      });
      toast.success(`${payoutType} deleted successfully`);
      setRefreshTrigger((prev) => prev + 1);
    } catch {
      toast.error('Error deleting address');
    }
  };

  return {
    upiWallets,
    solanaWallets,
    setRefreshTrigger,
    addWallet,
    deleteWallet,
  };
};
