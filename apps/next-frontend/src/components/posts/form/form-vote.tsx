'use client';
import React from 'react';

import { useAction } from '@/hooks/useAction';

import { toast } from 'sonner';

import { ThumbsDownIcon, ThumbsUpIcon } from 'lucide-react';
import { voteHandlerAction } from '@/actions/commentVote';
import { VoteType } from '@repo/db';
import { usePathname } from 'next/navigation';

interface IVoteFormProps {
  questionId: number | undefined;
  answerId: number | undefined;
  upvotes: number;
  downvotes: number;
  votesArr: any[];
}

const VoteForm: React.FC<IVoteFormProps> = ({
  questionId,
  answerId,
  upvotes = 0,
  downvotes = 0,
  votesArr,
}) => {
  const currentPath = usePathname();
  const { execute } = useAction(voteHandlerAction, {
    onSuccess: () => { },
    onError: (error) => {
      toast.error(error);
    },
  });
  const handleVote = (voteType: VoteType) => {
    toast.promise(
      execute({ voteType, questionId, answerId, currentPath }),
      voteType === VoteType.DOWNVOTE
        ? {
          loading: 'Downvoting...',
          success: 'Question has been downvoted.',
          error: 'Error',
        }
        : {
          loading: 'Upvoting...',
          success: 'Question has been upvoted.',
          error: 'Error',
        },
    );
  };

  const userVoted = Boolean(votesArr.length);
  const userVoteVal = votesArr[0];

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
          className="flex items-center gap-1 text-gray-500 dark:text-gray-400"
          type="submit"
        >
          <ThumbsUpIcon
            className="h-4 w-4"
            type="submit"
            fill={
              userVoted && userVoteVal.voteType === VoteType.UPVOTE
                ? 'currentColor'
                : 'none'
            }
          />

          <span>{upvotes}</span>
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
          className="flex items-center gap-1 text-gray-500 dark:text-gray-400"
          type="submit"
        >
          <ThumbsDownIcon
            className="h-4 w-4"
            fill={
              userVoted && userVoteVal.voteType === VoteType.DOWNVOTE
                ? 'currentColor'
                : 'none'
            }
          />

          <span>{downvotes}</span>
        </button>
      </form>
    </div>
  );
};

export default VoteForm;
