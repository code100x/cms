'use client';
import { voteHandlerAction } from '@/actions/commentVote';
import { useAction } from '@/hooks/useAction';
import { VoteType } from '@prisma/client';
import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

const CommentVoteForm = ({
  upVotes,
  downVotes,
  commentId,
}: {
  upVotes: number
  downVotes: number
  commentId: number
}) => {
  const currentPath = usePathname();
  const { execute } = useAction(voteHandlerAction, {
    onSuccess: () => {
      toast('Comment added');
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const handleUpvote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    execute({
      commentId,
      voteType: VoteType.UPVOTE,
      currentPath,
    });
  };
  const handleDownVote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    execute({
      commentId,
      voteType: VoteType.DOWNVOTE,
      currentPath,
    });
  };
  return (
    <div className="flex gap-2">
      <form onSubmit={handleUpvote}>
        <button
          className="flex items-center gap-1 text-gray-500 dark:text-gray-400"
          type="submit"
        >
          <ThumbsUpIcon className="w-4 h-4" type="submit" />

          <span>{upVotes}</span>
        </button>
      </form>
      <form onSubmit={handleDownVote}>
        <button
          className="flex items-center gap-1 text-gray-500 dark:text-gray-400"
          type="submit"
        >
          <ThumbsDownIcon className="w-4 h-4" />

          <span>{downVotes}</span>
        </button>
      </form>
    </div>
  );
};

export default CommentVoteForm;
