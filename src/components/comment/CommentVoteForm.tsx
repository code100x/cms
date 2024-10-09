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

  const handleVote = (newVoteType: VoteType) => {
    let toastMessage = {
      loading: 'Processing vote...',
      success: 'Vote updated successfully.',
      error: 'Error updating vote.',
    };

    if (voteType === newVoteType) {
      toastMessage = {
        loading: 'Removing vote...',
        success: `Vote removed successfully.`,
        error: 'Error removing vote.',
      };
    } else if (voteType === null) {
      toastMessage = {
        loading:
          newVoteType === VoteType.UPVOTE ? 'Upvoting...' : 'Downvoting...',
        success:
          newVoteType === VoteType.UPVOTE
            ? 'Comment upvoted.'
            : 'Comment downvoted.',
        error: 'Error casting vote.',
      };
    } else {
      toastMessage = {
        loading: 'Changing vote...',
        success:
          newVoteType === VoteType.UPVOTE
            ? 'Changed to upvote.'
            : 'Changed to downvote.',
        error: 'Error changing vote.',
      };
    }

    toast.promise(
      execute({ voteType: newVoteType, commentId, currentPath, slug: '' }),
      toastMessage,
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
