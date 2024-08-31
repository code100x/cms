import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface ConfirmBountyDialogProps {
  isOpen: boolean;
  setIsOpen: (isopen: boolean) => void;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  currency: 'INR' | 'SOL';
}

export const ConfirmBountyDialog: React.FC<ConfirmBountyDialogProps> = ({
  isOpen,
  setIsOpen,
  onClose,
  onConfirm,
  currency,
}) => {
  const [amount, setAmount] = useState<string>('');

  const handleConfirm = () => {
    const parsedAmount = parseFloat(amount);
    if (!isNaN(parsedAmount)) {
      onConfirm(parsedAmount);
      onClose();
    } else {
      toast.error('Enter a valid Amount');
    }
  };

  const handleDismiss = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDismiss}>
      <DialogClose onClick={onClose} />
      <DialogContent>
        <DialogTitle>Confirm Bounty</DialogTitle>
        <p>Enter the amount of {currency} given:</p>
        <Input
          type="text"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
          }}
          className="mt-2 block w-full rounded border px-4 py-2 focus:outline-none"
          placeholder={`Enter amount in ${currency}`}
        />
        <DialogFooter>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
