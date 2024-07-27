'use client';

import { deleteMessage } from '@/actions/comment';
import { useAction } from '@/hooks/useAction';
import { Trash2Icon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const CommentDeleteForm = ({ commentId }: { commentId: number }) => {
  const currentPath = usePathname();

  const { execute } = useAction(deleteMessage, {
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
      <button type="submit">
        <div className="flex gap-x-2 items-center">
          Delete <Trash2Icon className="w-4 h-4" />
        </div>
      </button>
    </form>
  );
};

export default CommentDeleteForm;
