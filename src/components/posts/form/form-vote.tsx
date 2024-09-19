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
    onSuccess: () => {},
    onError: (error) => {
      toast.error(error);
    },
  });

  const getToastMessages = (voteType: VoteType) => {
    if (userVoted && userVoteVal.voteType === voteType) {
      return {
        loading: 'Removing vote...',
        success: 'Vote has been removed successfully.',
        error: 'Error removing vote.',
      };
    } else if (voteType === VoteType.DOWNVOTE) {
      return {
        loading: 'Downvoting...',
        success: 'Question has been downvoted.',
        error: 'Error downvoting.',
      };
    }
    return {
      loading: 'Upvoting...',
      success: 'Question has been upvoted.',
      error: 'Error upvoting.',
    };
  };

  const handleVote = (voteType: VoteType) => {
    const toastMessages = getToastMessages(voteType);

    toast.promise(
      execute({ voteType, questionId, answerId, currentPath }),
      toastMessages,
    );
  };

  const userVoted = Boolean(votesArr.length);
  const userVoteVal = votesArr[0];

  return (
    <div className="flex gap-2">
      <button
        className={`flex min-w-8 items-center gap-1 rounded-full px-4 py-1 text-lg transition-all duration-300 ${
          userVoted && userVoteVal.voteType === VoteType.UPVOTE
            ? 'bg-green-500/20 text-green-500'
            : 'bg-primary/10 text-primary hover:bg-green-500/20 hover:text-green-500'
        }`}
        onClick={() => handleVote(VoteType.UPVOTE)}
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
      </button>

      <button
        className={`flex min-w-8 items-center gap-1 rounded-full px-4 py-1 text-lg transition-all duration-300 ${
          userVoted && userVoteVal.voteType === VoteType.DOWNVOTE
            ? 'bg-red-500/20 text-red-500'
            : 'bg-primary/10 text-primary hover:bg-red-500/20 hover:text-red-500'
        }`}
        onClick={() => handleVote(VoteType.DOWNVOTE)}
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
      </button>
    </div>
  );
};

export default VoteForm;
