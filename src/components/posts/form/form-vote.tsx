'use client';
import React from 'react';

import { useAction } from '@/hooks/useAction';

import { toast } from 'sonner';

import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { voteHandlerAction } from '@/actions/commentVote';
import { VoteType } from '@prisma/client';
import { usePathname } from 'next/navigation';

interface IVoteFormProps {
  questionId: number | undefined;
  answerId: number | undefined;
  upvotes: number;
  downvotes: number;
  votesArr: any[];
  slug: string;
}

const VoteForm: React.FC<IVoteFormProps> = ({
  questionId,
  answerId,
  upvotes = 0,
  downvotes = 0,
  votesArr,
  slug,
}) => {
  const currentPath = usePathname();
  const { execute } = useAction(voteHandlerAction, {
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleVote = (voteType: VoteType) => {
    const isUpvote = voteType === VoteType.UPVOTE;
    const isUserVote = userVoted && userVoteVal.voteType === voteType;

    toast.promise(
      execute({ voteType, questionId, answerId, currentPath, slug }),
      isUserVote
        ? {
            loading: isUpvote ? 'Removing upvote...' : 'Removing downvote...',
            success: isUpvote ? 'Upvote removed.' : 'Downvote removed.',
            error: 'Error',
          }
        : isUpvote
        ? {
            loading: 'Upvoting...',
            success: 'Question has been upvoted.',
            error: 'Error',
          }
        : {
            loading: 'Downvoting...',
            success: 'Question has been downvoted.',
            error: 'Error',
          },
    );
  };

  const userVoted = Boolean(votesArr.length);
  const userVoteVal = votesArr[0];

  return (
    <div className="flex gap-2">
      <button
        className="m-auto"
        onClick={(e) => {
          e.stopPropagation();
          handleVote(VoteType.UPVOTE);
        }}
      >
        <div
          className={`flex min-w-8 items-center gap-1 rounded-full px-4 py-1 text-lg transition-all duration-300 ${
            userVoted && userVoteVal.voteType === VoteType.UPVOTE
              ? 'bg-green-500/20 text-green-500'
              : 'bg-primary/10 text-primary hover:bg-green-500/20 hover:text-green-500'
          }`}
        >
          <ArrowBigUp
            className={`size-5 ${
              userVoted && userVoteVal.voteType === VoteType.UPVOTE
                ? 'text-green-500'
                : ''
            }`}
            fill={
              userVoted && userVoteVal.voteType === VoteType.UPVOTE
                ? 'currentColor'
                : 'none'
            }
          />
          <span>{upvotes}</span>
        </div>
      </button>
      <button
        className="m-auto"
        onClick={(e) => {
          e.stopPropagation();
          handleVote(VoteType.DOWNVOTE);
        }}
      >
        <div
          className={`flex min-w-8 items-center gap-1 rounded-full px-4 py-1 text-lg transition-all duration-300 ${
            userVoted && userVoteVal.voteType === VoteType.DOWNVOTE
              ? 'bg-red-500/20 text-red-500'
              : 'bg-primary/10 text-primary hover:bg-red-500/20 hover:text-red-500'
          }`}
        >
          <ArrowBigDown
            className={`size-5 ${
              userVoted && userVoteVal.voteType === VoteType.DOWNVOTE
                ? 'text-red-500'
                : ''
            }`}
            fill={
              userVoted && userVoteVal.voteType === VoteType.DOWNVOTE
                ? 'currentColor'
                : 'none'
            }
          />
          <span>{downvotes}</span>
        </div>
      </button>
    </div>
  );
};

export default VoteForm;
