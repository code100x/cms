'use client';

import { approveComment } from '@/actions/comment';
import { useAction } from '@/hooks/useAction';
import { CheckIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const CommentApproveForm = ({
  commentId,
  contentId,
}: {
  commentId: number;
  contentId: number;
}) => {
  const currentPath = usePathname();

  const { execute } = useAction(approveComment, {
    onSuccess: () => {
      toast('Comment Approved');
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    execute({
      content_comment_ids: `${contentId};${commentId}`,
      approved: true,
      currentPath,
    });
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <button type="submit">
        <div className="flex gap-1 items-center">
          Approve Chapters <CheckIcon className="w-4 h-4" />
        </div>
      </button>
    </form>
  );
};

export default CommentApproveForm;
