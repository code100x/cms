'use client';
import { X } from 'lucide-react';
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
import { Loader } from './Loader';

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
      console.error(error);
      toast.error('An unexpected error occured');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative w-5/6 rounded-lg bg-white p-8 shadow-lg dark:bg-[#1F2937] sm:w-2/3 md:w-1/3">
        <h2 className="mb-4 text-center text-xl font-semibold">
          Add {title} address
        </h2>
        <button
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full justify-center"
          >
            <div className="flex flex-col">
              <Input
                className="w-52P sm:w-60"
                placeholder={`Enter your ${title} address`}
                {...register(fieldName)}
              />
              {errors[fieldName] && (
                <p className="ml-1 mt-2 text-sm text-red-500">
                  {errors[fieldName]?.message}
                </p>
              )}
            </div>
            <Button type="submit" className="mx-2 w-16 dark:text-white">
              {isLoading ? <Loader /> : 'Add'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
