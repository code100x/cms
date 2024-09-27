'use client';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import { payoutMethodSchema } from '@/actions/payoutMethods/schema';
import { addSolanaAddress, addUpi } from '@/actions/payoutMethods';
import { toast } from 'sonner';
import { useAction } from '@/hooks/useAction';
import { useState } from 'react';
import { Loader } from './helper/Loader';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function NewPayoutDialog({
  isOpen,
  onClose,
  title,
}: DialogProps) {
  if (!isOpen) return null;
  const fieldName = title === 'Solana' ? 'solanaAddress' : 'upiId';

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof payoutMethodSchema>>({
    resolver: zodResolver(payoutMethodSchema),
  });

  const { execute: executeAddUpi } = useAction(addUpi, {
    onSuccess: () => {
      toast.success('UPI address added');
      setIsLoading(false);
      reset();
      onClose();
    },
    onError: (error) => {
      toast.error(error);
      setIsLoading(false);
    },
  });
  const { execute: executeAddSolanaAddress } = useAction(addSolanaAddress, {
    onSuccess: () => {
      toast.success('Solana address added');
      setIsLoading(false);
      reset();
      onClose();
    },
    onError: (error) => {
      toast.error(error);
      setIsLoading(false);
    },
  });

  interface formData {
    upiId?: string;
    solanaAddress?: string;
  }

  const onSubmit = (data: formData) => {
    try {
      setIsLoading(true);
      switch (title) {
        case 'UPI':
          executeAddUpi({ upiId: data.upiId || '' });
          break;
        case 'Solana':
          executeAddSolanaAddress({ solanaAddress: data.solanaAddress || '' });
          break;
        default:
          throw new Error('Invalid method');
      }
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      toast.error('An unexpected error occured');
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add {title} Address</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
            <div className="flex flex-col gap-4">
              <Input
                placeholder={`Enter your ${title} address`}
                {...register(fieldName)}
                className="p-4"
              />
              {errors[fieldName] && (
                <p className="text-sm text-red-500">
                  {errors[fieldName]?.message}
                </p>
              )}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader /> : 'Add'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
