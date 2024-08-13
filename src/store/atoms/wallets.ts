import { atom } from 'recoil';
import { Wallets } from '@/hooks/useWallets';

export const upiWalletsState = atom<Wallets[]>({
  key: 'upiWallet',
  default: [],
});

export const solanaWalletsState = atom<Wallets[]>({
  key: 'solanaWallet',
  default: [],
});
