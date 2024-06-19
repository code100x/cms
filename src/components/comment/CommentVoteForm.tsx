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
  voteType,
}: {
  upVotes: number;
  downVotes: number;
  commentId: number;
  voteType: VoteType | null;
}) => {
  const currentPath = usePathname();

  const { execute, isLoading } = useAction(voteHandlerAction, {
    onSuccess: () => {
      toast('Comment Voted');
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
          className={`flex items-center gap-1 text-gray-500 dark:text-gray-400 ${isLoading && 'opacity-80'}`}
          type="submit"
          disabled={isLoading}
        >
          <ThumbsUpIcon
            className="h-4 w-4"
            type="submit"
            fill={
              voteType && voteType === VoteType.UPVOTE ? 'currentColor' : 'none'
            }
          />

          <span>{upVotes}</span>
        </button>
      </form>
      <form onSubmit={handleDownVote}>
        <button
          className={`flex items-center gap-1 text-gray-500 dark:text-gray-400 ${isLoading && 'opacity-80'}`}
          type="submit"
          disabled={isLoading}
        >
          <ThumbsDownIcon
            className="h-4 w-4"
            fill={
              voteType && voteType === VoteType.DOWNVOTE
                ? 'currentColor'
                : 'none'
            }
          />

          <span>{downVotes}</span>
        </button>
      </form>
    </div>
  );
};

export default CommentVoteForm;
