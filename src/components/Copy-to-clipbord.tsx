'use client';
import { CopyIcon } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

const CopyToClipboard = ({
  textToCopy,
}: {
  textToCopy: string;
  btnLabel?: string;
}) => {
  const handleCopyClick = () => {
    try {
      navigator.clipboard.writeText(textToCopy);
      toast.success('Copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy to clipboard');
    }
  };

  return (
    <div>
      <button onClick={handleCopyClick}>
        <div className="flex items-center gap-1">
          Copy <CopyIcon size={15} />
        </div>
      </button>
    </div>
  );
};

export default CopyToClipboard;
