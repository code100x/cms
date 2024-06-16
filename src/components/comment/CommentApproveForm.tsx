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

  const { execute, isLoading } = useAction(approveComment, {
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
      <button type="submit" disabled={isLoading}>
        <div className="flex items-center gap-1">
          Approve Chapters <CheckIcon className="h-4 w-4" />
        </div>
      </button>
    </form>
  );
};

export default CommentApproveForm;
