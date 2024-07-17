'use client';
import { ReplyIcon } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface ReplyButtonProps {
  setReplyInputBox: Dispatch<SetStateAction<boolean>>;
  replyInputBox: boolean;
}

const ReplyButton = ({ setReplyInputBox }: ReplyButtonProps) => {
  return (
    <div>
      <button
        className="flex items-center gap-1 text-gray-500 dark:text-gray-400"
        onClick={() => setReplyInputBox(true)}
      >
        <ReplyIcon className="h-4 w-4" />
        <span>Reply</span>
      </button>
    </div>
  );
};

export default ReplyButton;