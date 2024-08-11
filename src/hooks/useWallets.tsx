import axios from 'axios';
import { useEffect, useState } from 'react';

type Wallets = {
  id: number;
  parentId: string;
  address: string;
  addedAt: Date;
};
export const useWallets = () => {
  const [upiWallets, setUpiWallets] = useState<Wallets[]>();
  const [solanaWallets, setSolanaWallets] = useState<Wallets[]>();

  useEffect(() => {
    const fetchData = () => {
      axios.get('api/getwallets').then((res) => {
        setUpiWallets(res.data.upiWallets);
        setSolanaWallets(res.data.solanaWallets);
      });
    };

    fetchData();
  }, []);

  return {
    upiWallets,
    solanaWallets,
  };
};
