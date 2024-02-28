'use client';
import React, { useCallback, memo } from 'react';
import { voteHandlerAction } from '@/actions/commentVote';
import { useAction } from '@/hooks/useAction';
import { VoteType } from '@prisma/client';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';

const CommentVoteForm = memo(
  ({
    upVotes,
    downVotes,
    commentId,
  }: {
    upVotes: number;
    downVotes: number;
    commentId: number;
  }) => {
    const currentPath = usePathname();
    const { execute } = useAction(voteHandlerAction, {
      onSuccess: (voteType) => {
        console.log(voteType);
        const message = voteType?.upvotes !== 0 ? 'Upvoted' : 'Downvoted';
        toast(message);
      },
      onError: (error) => {
        toast.error(error);
      },
    });

    const UpIcon = upVotes !== 0 ? ThumbUpIcon : ThumbUpOffAltOutlinedIcon;
    const DownIcon = downVotes !== 0 ? ThumbDownIcon : ThumbDownAltOutlinedIcon;

    const handleVote = useCallback(
      (e: React.FormEvent<HTMLFormElement>, voteType: VoteType) => {
        e.preventDefault();
        execute({
          commentId,
          voteType,
          currentPath,
        });
      },
      [execute, commentId, currentPath],
    );

    return (
      <div className="flex gap-2">
        <form onSubmit={(e) => handleVote(e, VoteType.UPVOTE)}>
          <button
            className="flex items-center gap-1 text-gray-500 dark:text-gray-400"
            type="submit"
          >
            {<UpIcon fontSize="small" />}
            <span>{upVotes}</span>
          </button>
        </form>
        <form onSubmit={(e) => handleVote(e, VoteType.DOWNVOTE)}>
          <button
            className="flex items-center gap-1 text-gray-500 dark:text-gray-400"
            type="submit"
          >
            {<DownIcon fontSize="small" />}
            <span>{downVotes}</span>
          </button>
        </form>
      </div>
    );
  },
);

export default CommentVoteForm;
