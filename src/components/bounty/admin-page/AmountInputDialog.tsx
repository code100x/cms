import { Dialog } from '@/components/ui/dialog';
import React, { useState } from 'react';
import { Button } from 'react-day-picker';
import { toast } from 'sonner';

interface AmountInputDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
}

const AmountInputDialog: React.FC<AmountInputDialogProps> = ({
  onClose,
  onConfirm,
}) => {
  const [amount, setAmount] = useState<string>('');

  const handleConfirm = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount) && parsedAmount > 0) {
      onConfirm(parsedAmount);
      onClose();
    } else {
      toast.error('Invalid amount entered.');
    }
  };

  return (
    <Dialog>
      <div className="p-4">
        <h2 className="text-lg font-semibold">Enter Bounty Amount</h2>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="mt-2 w-full rounded border p-2"
          placeholder="Amount in SOL"
        />
        <div className="mt-4 flex justify-end space-x-2">
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default AmountInputDialog;
