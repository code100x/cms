import React from 'react';
import { Button } from '@/components/ui/button';
import { DialogContent, DialogHeader } from '@/components/ui/dialog';
import { TrashIcon } from 'lucide-react';
import { toast } from 'sonner';

interface ViewAllDialogProps {
  title: string;
  addresses:
    | Array<{
        id: number;
        value: string;
        userId: string;
      }>
    | undefined;
  onDelete: (id: number) => void;
}

export const ViewAllDialog: React.FC<ViewAllDialogProps> = ({
  title,
  addresses,
  onDelete,
}) => {
  return (
    <DialogContent className="pb-4 sm:max-w-[625px]">
      <DialogHeader>
        <div className="flex flex-col gap-6 py-2">
          <div className="grid gap-1 text-left">
            <h3 className="text-2xl font-bold">{title}</h3>
            <span className="text-sm text-gray-400">
              Click on address to copy
            </span>
          </div>
        </div>
      </DialogHeader>
      <div className="grid gap-4">
        {addresses?.length !== 0 ? (
          addresses?.map((address, index) => (
            <div key={index} className="flex items-center justify-between">
              <div
                className="cursor-pointer"
                onClick={() => {
                  navigator.clipboard.writeText(address.value);
                  toast.success('Copied to clipboard');
                }}
              >
                <p className="text-sm md:text-base">
                  {address.value.slice(0, 20)}...
                </p>
              </div>
              <Button
                onClick={() => onDelete(address.id)}
                variant="outline"
                size="icon"
              >
                <TrashIcon className="h-4 w-4" />
                <span className="sr-only">Delete Address</span>
              </Button>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-start">
            <p className="py-3">No addresses added yet!</p>
          </div>
        )}
      </div>
    </DialogContent>
  );
};
