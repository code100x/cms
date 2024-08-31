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
      <DialogContent className="mt-2">
        <ul className="list-disc pl-5">
          {bounties.map((bounty) => (
            <li key={bounty.id} className="mt-1">
              <a
                href={bounty.prLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {bounty.user.name} |{bounty.paymentMethod}
                <br />
                {bounty.prLink}
              </a>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmedBountiesDialog;
