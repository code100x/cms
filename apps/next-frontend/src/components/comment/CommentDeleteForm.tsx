'use client';

import { deleteMessage } from '@/actions/comment';
import { useAction } from '@/hooks/useAction';
import { Trash2Icon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const CommentDeleteForm = ({ commentId }: { commentId: number }) => {
  const currentPath = usePathname();

  const { execute, isLoading } = useAction(deleteMessage, {
    onSuccess: () => {
      toast('Comment deleted');
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    execute({
      commentId,
      currentPath,
    });
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <button type="submit" disabled={isLoading}>
        <div className="flex items-center gap-x-2">
          Delete <Trash2Icon className="h-4 w-4" />
        </div>
      </button>
    </form>
  );
};

export default CommentDeleteForm;
