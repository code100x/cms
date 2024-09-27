'use client';

import { pinComment } from '@/actions/comment';
import { useAction } from '@/hooks/useAction';
import { PinIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const CommentPinForm = ({
  commentId,
  contentId,
}: {
  commentId: number;
  contentId: number;
}) => {
  const currentPath = usePathname();

  const { execute, isLoading } = useAction(pinComment, {
    onSuccess: () => {
      toast('Comment Pinned');
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    execute({
      commentId,
      contentId,
      currentPath,
    });
  };
  return (
    <form className="w-full" onSubmit={handleFormSubmit}>
      <button className="w-full" type="submit" disabled={isLoading}>
        <div className="flex items-center gap-1">
          <PinIcon className="h-4 w-4" />
          Pin
        </div>
      </button>
    </form>
  );
};

export default CommentPinForm;
