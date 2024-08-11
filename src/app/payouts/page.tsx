import { AddPayout } from '@/components/AddNewPayout';
import { Wallets } from '@/components/WalletDialog';

export default async function Payout() {
  return (
    <main className="flex flex-col items-center justify-center">
      <AddPayout />
      <Wallets />
    </main>
  );
}
