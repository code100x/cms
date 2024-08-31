'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { submitBounty } from '@/actions/bounty';
import { Button } from '@/components/ui/button';
import { Input } from '../ui/input';
import { bountySubmissionSchema } from '@/actions/bounty/schema';
import { BountySubmissionData } from '@/actions/bounty/types';
import { UpiId, SolanaAddress } from '@prisma/client';
import { X } from 'lucide-react';

interface BountySubmissionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  upiAddresses?: UpiId[];
  solanaAddresses?: SolanaAddress[];
}

export default function BountySubmissionDialog({
  isOpen,
  onClose,
  upiAddresses,
  solanaAddresses,
}: BountySubmissionDialogProps) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<BountySubmissionData>({
    resolver: zodResolver(bountySubmissionSchema),
  });

  const onSubmit: SubmitHandler<BountySubmissionData> = async (data) => {
    try {
      if (!upiAddresses?.length && !solanaAddresses?.length) {
        setSubmitError('Add at least 1 payment method');
        return;
      }
      const result = await submitBounty(data);
      console.log(result);
      reset();
      onClose();
    } catch (error: any) {
      if (
        error instanceof Error &&
        error.message.includes(
          'Unique constraint failed on the fields: (`userId`,`prLink`)',
        )
      ) {
        setSubmitError('Cannot submit the same PR again');
      } else {
        setSubmitError(`Failed to submit bounty: ${error.message}`);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="relative w-5/6 rounded-lg bg-white p-8 shadow-lg dark:bg-[#1F2937] sm:w-2/3 md:w-1/3">
        <h2 className="mb-4 text-center text-xl font-semibold">
          Submit Your Bounty
        </h2>
        <button
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input
              className="w-full px-2"
              placeholder="Enter GitHub PR Link"
              {...register('prLink')}
            />
            {errors.prLink && (
              <p className="mt-2 text-sm text-red-500">
                {errors.prLink?.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="mb-2 block font-semibold">Payment Method</label>
            <select
              className="w-full rounded-md border border-gray-300 p-2 dark:bg-gray-700 dark:text-white"
              {...register('paymentMethod')}
            >
              <option value="">Select Payment Method</option>
              {upiAddresses?.map((upi) => (
                <option key={upi.id} value={`${upi.value}`}>
                  {upi.value} (UPI)
                </option>
              ))}
              {solanaAddresses?.map((sol) => (
                <option key={sol.id} value={`${sol.value}`}>
                  {sol.value} (Solana)
                </option>
              ))}
            </select>
            {submitError && (
              <p className="mt-2 text-sm text-red-500">{submitError}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
