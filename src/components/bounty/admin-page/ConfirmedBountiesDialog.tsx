import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Bounty } from '@/actions/bounty/adminActions';
import React from 'react';

interface ConfirmedBountiesDialogProps {
  isOpen: boolean;
  onClose: () => void;
  bounties: Bounty[];
}

const ConfirmedBountiesDialog: React.FC<ConfirmedBountiesDialogProps> = ({
  isOpen,
  onClose,
  bounties,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="mt-4 max-h-[80vh] overflow-y-auto rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
        <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">
          Confirmed Bounties
        </h2>
        <ul className="list-disc space-y-3 overflow-y-hidden pl-5">
          {bounties.map((bounty) => (
            <li key={bounty.id}>
              <div className="flex-col rounded-md px-2 py-2 shadow-md dark:bg-gray-700">
                <div className="flex justify-between font-medium text-gray-700 dark:text-gray-300">
                  {bounty.user.name}
                  <a
                    href={bounty.prLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                  >
                    Link
                  </a>
                </div>
                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  <span>Paid to: {bounty.paymentMethod}</span>
                </div>
                <span>
                  Amount : {bounty.amount}{' '}
                  {bounty.paymentMethod.includes('@') ? 'INR' : 'SOL'}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmedBountiesDialog;
