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
    <div className='w-full'>
      <button className='w-full px-2 py-1' onClick={handleCopyClick}>
        <div className="flex items-center gap-x-2">
          Copy <CopyIcon size={15} />
        </div>
      </button>
    </div>
  );
};

export default CopyToClipboard;
