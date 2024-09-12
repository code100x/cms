'use client';

import React from 'react';
import { useAction } from '@/hooks/useAction';
import { toast } from 'sonner';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { voteHandlerAction } from '@/actions/commentVote';
import { VoteType } from '@prisma/client';
import { usePathname } from 'next/navigation';

interface CommentVoteFormProps {
  upVotes: number;
  downVotes: number;
  commentId: number;
  voteType: VoteType | null;
}

const CommentVoteForm: React.FC<CommentVoteFormProps> = ({
  upVotes,
  downVotes,
  commentId,
  voteType,
}) => {
  const currentPath = usePathname();
  const { execute, isLoading } = useAction(voteHandlerAction, {
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleVote = (voteType: VoteType) => {
    toast.promise(
      execute({ voteType, commentId, currentPath }),
      voteType === VoteType.DOWNVOTE
        ? {
            loading: 'Downvoting...',
            success: 'Comment has been downvoted.',
            error: 'Error',
          }
        : {
            loading: 'Upvoting...',
            success: 'Comment has been upvoted.',
            error: 'Error',
          },
    );
  };

  const isUpvoted = voteType === VoteType.UPVOTE;
  const isDownvoted = voteType === VoteType.DOWNVOTE;

  return (
    <div className="flex gap-2">
      <form
        className="m-auto"
        onSubmit={(e) => {
          e.preventDefault();
          handleVote(VoteType.UPVOTE);
        }}
      >
        <button
          className={`flex items-center gap-1 rounded-full text-lg transition-all duration-300 ${
            isUpvoted
              ? 'text-green-500'
              : 'text-neutral-500 hover:text-green-500'
          }`}
          type="submit"
          disabled={isLoading}
        >
          <ArrowBigUp
            className={`size-6 ${isUpvoted ? 'text-green-500' : ''}`}
            fill={isUpvoted ? 'currentColor' : 'none'}
          />
          <span>{upVotes}</span>
        </button>
      </form>
      <form
        className="m-auto"
        onSubmit={(e) => {
          e.preventDefault();
          handleVote(VoteType.DOWNVOTE);
        }}
      >
        <button
          className={`flex items-center gap-1 rounded-full text-lg transition-all duration-300 ${
            isDownvoted ? 'text-red-500' : 'text-neutral-500 hover:text-red-500'
          }`}
          type="submit"
          disabled={isLoading}
        >
          <ArrowBigDown
            className={`size-6 ${isDownvoted ? 'text-red-500' : ''}`}
            fill={isDownvoted ? 'currentColor' : 'none'}
          />
          <span>{downVotes}</span>
        </button>
      </form>
    </div>
  );
};

export default CommentVoteForm;
