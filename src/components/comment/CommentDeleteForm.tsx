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
    <form className="w-full" onSubmit={handleFormSubmit}>
      <button
        className="flex w-full items-center gap-2"
        type="submit"
        disabled={isLoading}
      >
        <Trash2Icon className="size-4" />
        Delete
      </button>
    </form>
  );
};

export default CommentDeleteForm;
